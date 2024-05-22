import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as MOCKS from '@common/mocks';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
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

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });

  describe('create', () => {
    it('should create a book', async () => {
      const user = { id: MOCKS.USER_ID };
      const createBookDto = MOCKS.CREATE_BOOK;
      jest.spyOn(booksService, 'create').mockResolvedValue(MOCKS.SUCCESS);

      expect(await booksController.create(user, createBookDto)).toEqual(MOCKS.SUCCESS);
      expect(booksService.create).toHaveBeenCalledWith(user, createBookDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      jest.spyOn(booksService, 'findAll').mockResolvedValue(MOCKS.BOOKS);

      expect(await booksController.findAll(MOCKS.PAGINATION_QUERY)).toBe(MOCKS.BOOKS);
    });
  });

  describe('findOne', () => {
    it('should return a single book', async () => {
      jest.spyOn(booksService, 'findOne').mockResolvedValue(MOCKS.BOOK);

      expect(await booksController.findOne({ id: MOCKS.BOOK_ID })).toBe(MOCKS.BOOK);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      jest.spyOn(booksService, 'update').mockResolvedValue(MOCKS.SUCCESS);

      expect(await booksController.update({ id: MOCKS.BOOK_ID }, MOCKS.UPDATE_BOOK)).toEqual(MOCKS.SUCCESS);
      expect(booksService.update).toHaveBeenCalledWith(MOCKS.BOOK_ID, MOCKS.UPDATE_BOOK);
    });
  });

  describe('remove', () => {
    it('should remove a book', async () => {
      jest.spyOn(booksService, 'remove').mockResolvedValue(undefined);

      expect(await booksController.remove({ id: MOCKS.BOOK_ID })).toBeUndefined();
      expect(booksService.remove).toHaveBeenCalledWith(MOCKS.BOOK_ID);
    });
  });
});
