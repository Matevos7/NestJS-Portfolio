import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthTokensDTO, RegistrationDTO, LoginDTO } from './dto';
import { AuthToken } from '@common/decorators';

@ApiTags('Authentication management')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) { }

  @Post('registration')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'This API registers a new user in the database.',
  })
  registration(@Body() body: RegistrationDTO): Promise<AuthTokensDTO> {
    return this._authService.registration(body);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'This API aimed to check the "refresh token" and refresh the "access token".',
  })
  @ApiBearerAuth()
  async refreshToken(
    @AuthToken() refreshToken: string,
  ): Promise<AuthTokensDTO> {
    return this._authService.refreshAccessToken(refreshToken);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Login API.',
  })
  public login(@Body() body: LoginDTO): Promise<AuthTokensDTO> {
    return this._authService.login(body);
  }
}
