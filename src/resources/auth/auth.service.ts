import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { ERROR_MESSAGES } from '@common/messages';
import { Transactional } from 'typeorm-transactional';
import { ResponseManager } from '@common/helpers';
import { Country, User } from '@common/database/entities';
import { IAuthTokens, ILogin, IRegistration, ITokenPayload } from '@common/models';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,

    @InjectRepository(Country)
    private _countryRepository: Repository<Country>,

    private _configService: ConfigService,

    private _jwtService: JwtService,
  ) { }

  /**
   * This method aimed to create a new user in the database.
   * @param {IRegistration} body
   * @returns {IAuthTokens}
   */
  @Transactional()
  async registration(body: IRegistration): Promise<IAuthTokens> {
    const { email, phone } = body;

    const user = await this._userRepository.findOne({
      where: [{ email }, { phone }],
    });

    if (user) {
      throw ResponseManager.buildError(
        ERROR_MESSAGES.USER_ALREADY_EXISTS,
      );
    }

    const country = await this._countryRepository.findOneBy({
      id: body.countryId,
    });

    if (!country) {
      throw ResponseManager.buildError(ERROR_MESSAGES.COUNTRY_NOT_EXISTS, HttpStatus.NOT_FOUND);
    }

    body.password = await bcrypt.hash(body.password, 10);

    const { id } = await this._userRepository.save({ ...body, country });
    const payload: ITokenPayload = {
      id,
    };
    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(id);

    return { accessToken, refreshToken };
  }

  /**
 * This method aimed to create JWT access token based on provided payload.
 * @param {ITokenPayload} payload
 * @returns {string}
 */
  async createAccessToken(payload: ITokenPayload): Promise<string> {
    return this._jwtService.sign(payload);
  }

  /**
   * This method aimed to create JWT refresh token based on provided customer id.
   * @param {string} id
   * @returns {string}
   */
  async createRefreshToken(id: number): Promise<string> {
    const refreshToken = uuid();

    return this._jwtService.sign(
      { sub: id, jti: refreshToken },
      { expiresIn: this._configService.get('JWT_CONFIG.refreshExpiresIn') },
    );
  }

  /**
 * This method aimed to refresh the access token.
 * @param {string} refreshToken
 * @returns {IAuthTokens}
 */
  async refreshAccessToken(refreshToken: string): Promise<IAuthTokens> {
    refreshToken = refreshToken?.replace('Bearer', '')?.trim();
    // Will throw an exception in case of not valid refresh token
    const { id } = await this.validateRefreshToken(
      refreshToken,
    );

    const accessToken = await this.createAccessToken({
      id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * This method aimed to refresh the access token.
   * @param {string} refreshToken
   * @returns {IAuthTokens}
   */
  async validateRefreshToken(refreshToken: string): Promise<User> {
    try {
      await this._jwtService.verify(refreshToken);
      const decoded = this._jwtService.decode(refreshToken);
      // Check if the user associated with the token is still valid and has not been revoked
      const user = await this._userRepository.findOneBy({
        id: Number(decoded.sub),
      });
      if (!user) {
        throw ResponseManager.buildError(
          ERROR_MESSAGES.USER_UNAUTHORIZED,
          HttpStatus.UNAUTHORIZED,
        );
      }

      return user;
    } catch (error) {
      throw ResponseManager.buildError(
        error?.response ?? ERROR_MESSAGES.USER_UNAUTHORIZED,
        error?.status ?? HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * This method checks the user in the database and returns tokens
   * @param {ILogin} body
   * @returns {IAuthTokens}
   */
  public async login(body: ILogin): Promise<IAuthTokens> {
    const { login, password } = body;

    const user = await this._userRepository.findOne({
      where: [{ email: login }, { phone: login }],
    });

    if (!user) {
      throw ResponseManager.buildError(
        ERROR_MESSAGES.USER_NOT_EXISTS,
        HttpStatus.NOT_FOUND
      );
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw ResponseManager.buildError(
        ERROR_MESSAGES.USER_INVALID_PASSWORD,
      );
    }

    const payload = { id: user.id };
    const accessToken = await this.createAccessToken(payload);
    const refreshToken = await this.createRefreshToken(user.id);

    return { accessToken, refreshToken };
  }
}
