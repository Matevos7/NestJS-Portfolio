import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';
import { Repository } from 'typeorm';
import { Author } from '@common/database/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ICreateAuthor, ITokenPayload } from '@common/models';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as MOCKS from '@common/mocks';

describe('AuthorsController', () => {
  let authorsController: AuthorsController;
  let authorsService: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
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

    authorsController = module.get<AuthorsController>(AuthorsController);
    authorsService = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(authorsController).toBeDefined();
  });

  describe('create', () => {
    it('should create an author', async () => {
      const user: ITokenPayload = { id: MOCKS.USER_ID };
      const createAuthorDto: ICreateAuthor = MOCKS.CREATE_AUTHOR;
      jest.spyOn(authorsService, 'create').mockResolvedValue(MOCKS.SUCCESS);

      expect(await authorsController.create(user, createAuthorDto)).toEqual(MOCKS.SUCCESS);
      expect(authorsService.create).toHaveBeenCalledWith(user, createAuthorDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      jest.spyOn(authorsService, 'findAll').mockResolvedValue(MOCKS.AUTHORS);

      expect(await authorsController.findAll(MOCKS.PAGINATION_QUERY)).toBe(MOCKS.AUTHORS);
    });
  });

  describe('findOne', () => {
    it('should return a single author', async () => {
      jest.spyOn(authorsService, 'findOne').mockResolvedValue(MOCKS.AUTHOR);

      expect(await authorsController.findOne({ id: MOCKS.AUTHOR_ID })).toBe(MOCKS.AUTHOR);
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      jest.spyOn(authorsService, 'update').mockResolvedValue(MOCKS.SUCCESS);

      expect(await authorsController.update({ id: MOCKS.AUTHOR_ID }, MOCKS.UPDATE_AUTHOR)).toEqual(MOCKS.SUCCESS);
      expect(authorsService.update).toHaveBeenCalledWith(MOCKS.AUTHOR_ID, MOCKS.UPDATE_AUTHOR);
    });
  });

  describe('remove', () => {
    it('should remove an author', async () => {
      jest.spyOn(authorsService, 'remove').mockResolvedValue(undefined);

      expect(await authorsController.remove({ id: MOCKS.AUTHOR_ID })).toBeUndefined();
      expect(authorsService.remove).toHaveBeenCalledWith(MOCKS.AUTHOR_ID);
    });
  });
});
