import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { omit } from 'lodash';


import { Book } from '@common/database/entities';
import { Author } from '@common/database/entities';
import { ICreateBook, IMessageSuccess, IPagination, ITokenPayload } from '@common/models';
import { ERROR_MESSAGES } from '@common/messages';
import { ResponseManager } from '@common/helpers';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) { }

  /**
   * This method is used to create a new book in the database.
   * @param {ITokenPayload} user
   * @param {CreateBookDTO} body
   * @returns {Promise<IMessageSuccess>}
   */
  async create(user: ITokenPayload, body: ICreateBook): Promise<IMessageSuccess> {
    const author = await this.authorRepository.findOne({ where: { id: body.authorId } });
    if (!author) {
      throw ResponseManager.buildError(ERROR_MESSAGES.AUTHOR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.bookRepository.save({
      ...omit(body, 'authorId'), author, user: {
        id: user.id
      }
    });
    return { success: true };
  }

  /**
   * This method is used to retrieve all books from the database.
   * @param {IPagination} pagination
   * @returns {Promise<Book[]>}
   */
  async findAll(pagination: IPagination): Promise<Book[]> {
    const { offset, limit } = pagination;

    return this.bookRepository.find({ relations: ['author'], skip: offset, take: limit });
  }

  /**
   * This method is used to retrieve a single book by id.
   * @param {number} id
   * @returns {Promise<Book>}
   */
  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id }, relations: ['author'] });
    return book;
  }

  /**
   * This method is used to update an existing book in the database.
   * @param {number} id
   * @param {Partial<ICreateBook>} body
   * @returns {Promise<IMessageSuccess>}
   */
  async update(id: number, body: Partial<ICreateBook>): Promise<IMessageSuccess> {
    const author = body.authorId
      ? await this.authorRepository.findOne({ where: { id: body.authorId } })
      : null;
    if (body.authorId && !author) {
      throw ResponseManager.buildError(ERROR_MESSAGES.AUTHOR_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    await this.bookRepository.update(id, {
      ...omit(body, 'authorId'),
      author
    });
    return { success: true };
  }

  /**
   * This method is used to delete a book from the database.
   * @param {number} id
   * @returns {Promise<void>}
   */
  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
