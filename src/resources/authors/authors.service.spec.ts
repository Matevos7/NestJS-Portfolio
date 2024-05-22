import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from '@common/database/entities';
import { ICreateAuthor, ITokenPayload } from '@common/models';
import * as MOCKS from '@common/mocks';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let authorRepository: Repository<Author>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    authorRepository = module.get<Repository<Author>>(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an author', async () => {
      const user: ITokenPayload = { id: MOCKS.USER_ID };
      const body: ICreateAuthor = MOCKS.CREATE_AUTHOR;
      jest.spyOn(authorRepository, 'save').mockResolvedValue(MOCKS.AUTHOR as any);

      const result = await service.create(user, body);
      expect(result).toEqual(MOCKS.SUCCESS);
      expect(authorRepository.save).toHaveBeenCalledWith({
        ...body,
        user,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of authors', async () => {
      jest.spyOn(authorRepository, 'find').mockResolvedValue(MOCKS.AUTHORS);

      const result = await service.findAll(MOCKS.PAGINATION_QUERY);
      expect(result).toBe(MOCKS.AUTHORS);
    });
  });

  describe('findOne', () => {
    it('should return a single author', async () => {
      jest.spyOn(authorRepository, 'findOne').mockResolvedValue(MOCKS.AUTHOR);

      const result = await service.findOne(MOCKS.AUTHOR_ID);
      expect(result).toBe(MOCKS.AUTHOR);
    });
  });

  describe('update', () => {
    it('should update an author', async () => {
      const body: Partial<ICreateAuthor> = MOCKS.UPDATE_AUTHOR;
      jest.spyOn(authorRepository, 'update').mockResolvedValue({ affected: 1 } as any);

      const result = await service.update(MOCKS.AUTHOR_ID, body);
      expect(result).toEqual(MOCKS.SUCCESS);
      expect(authorRepository.update).toHaveBeenCalledWith(MOCKS.AUTHOR_ID, body);
    });
  });

  describe('remove', () => {
    it('should remove an author', async () => {
      jest.spyOn(authorRepository, 'delete').mockResolvedValue({ affected: 1 } as any);

      const result = await service.remove(MOCKS.AUTHOR_ID);
      expect(result).toBeUndefined();
      expect(authorRepository.delete).toHaveBeenCalledWith(MOCKS.AUTHOR_ID);
    });
  });
});
