import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service.js';
import { User } from './user.entity.js';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Partial<Repository<User>>>;

  const mockUser: User = {
    id: 'user-1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'hashed-password',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    repository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findByEmail', () => {
    it('should return a user by email', async () => {
      repository.findOne!.mockResolvedValue(mockUser);
      const result = await service.findByEmail('test@example.com');
      expect(result).toEqual(mockUser);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should return null when user not found', async () => {
      repository.findOne!.mockResolvedValue(null);
      const result = await service.findByEmail('nonexistent@example.com');
      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('should return a user by id', async () => {
      repository.findOne!.mockResolvedValue(mockUser);
      const result = await service.findById('user-1');
      expect(result).toEqual(mockUser);
    });
  });

  describe('create', () => {
    it('should hash password and create user', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
      repository.create!.mockReturnValue(mockUser);
      repository.save!.mockResolvedValue(mockUser);

      const result = await service.create(
        'test@example.com',
        'John',
        'Doe',
        'plain-password',
      );

      expect(bcrypt.hash).toHaveBeenCalledWith('plain-password', 10);
      expect(repository.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'hashed-password',
      });
      expect(result).toEqual(mockUser);
    });
  });
});
