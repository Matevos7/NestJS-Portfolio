import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from '@common/database/entities';
import { CreateAuthorDTO, UpdateAuthorDTO } from './dto';
import { IMessageSuccess, IPagination, ITokenPayload } from '@common/models';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) { }

  /**
   * This method is used to create a new author in the database.
   * @param {ITokenPayload} user
   * @param {CreateAuthorDTO} body
   * @returns {Promise<Author>}
   */
  async create(user: ITokenPayload, body: CreateAuthorDTO): Promise<IMessageSuccess> {
    await this.authorRepository.save({
      ...body, user: {
        id: user.id
      }
    });

    return { success: true };
  }

  /**
   * This method is used to retrieve all authors from the database.
   * @param {IPagination} pagination
   * @returns {Promise<Author[]>}
   */
  async findAll(pagination: IPagination): Promise<Author[]> {
    const { offset, limit } = pagination;
    return this.authorRepository.find({
      skip: offset,
      take: limit
    });
  }

  /**
   * This method is used to retrieve a single author by id.
   * @param {number} id
   * @returns {Promise<Author>}
   */
  async findOne(id: number): Promise<Author> {
    return this.authorRepository.findOne({ where: { id } });
  }

  /**
   * This method is used to update an existing author in the database.
   * @param {number} id
   * @param {UpdateAuthorDTO} body
   * @returns {Promise<Author>}
   */
  async update(id: number, body: UpdateAuthorDTO): Promise<IMessageSuccess> {
    await this.authorRepository.update(id, body);

    return { success: true };
  }

  /**
   * This method is used to delete an author from the database.
   * @param {number} id
   * @returns {Promise<void>}
   */
  async remove(id: number): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
