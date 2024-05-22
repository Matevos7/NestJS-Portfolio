import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Author, Book } from '@common/database/entities';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ICreateBook, ITokenPayload } from '@common/models';
import { BooksController } from './books.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as MOCKS from '@common/mocks';

describe('BooksService', () => {
  let service: BooksService;
  let bookRepository: Repository<Book>;
  let authorRepository: Repository<Author>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Author),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(process.env.JWT_SECRET),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              if (key === 'JWT_CONFIG.secret') return process.env.JWT_SECRET;
              if (key === 'JWT_CONFIG.expiresIn') return process.env.JWT_EXPIRES_IN;
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
    authorRepository = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const user: ITokenPayload = { id: MOCKS.USER_ID };
      const body: ICreateBook = MOCKS.CREATE_BOOK;
      jest.spyOn(authorRepository, 'findOne').mockResolvedValue(MOCKS.AUTHOR);
      jest.spyOn(bookRepository, 'save').mockResolvedValue(MOCKS.BOOK as any);

      expect(await service.create(user, body)).toEqual(MOCKS.SUCCESS);
      expect(bookRepository.save).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      jest.spyOn(bookRepository, 'find').mockResolvedValue(MOCKS.BOOKS);

      expect(await service.findAll(MOCKS.PAGINATION_QUERY)).toBe(MOCKS.BOOKS);
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      jest.spyOn(bookRepository, 'findOne').mockResolvedValue(MOCKS.BOOK);

      expect(await service.findOne(MOCKS.BOOK_ID)).toBe(MOCKS.BOOK);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const body: Partial<ICreateBook> = MOCKS.UPDATE_BOOK;
      jest.spyOn(bookRepository, 'update').mockResolvedValue(MOCKS.BOOK as any);

      expect(await service.update(MOCKS.BOOK_ID, body)).toEqual(MOCKS.SUCCESS);
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      jest.spyOn(bookRepository, 'delete').mockResolvedValue(undefined);

      expect(await service.remove(MOCKS.BOOK_ID)).toBeUndefined();
      expect(bookRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
