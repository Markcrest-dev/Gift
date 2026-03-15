import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<Partial<UsersService>>;
  let jwtService: jest.Mocked<Partial<JwtService>>;

  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'hashed-password',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      findByEmailWithPassword: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should create user and return token', async () => {
      usersService.findByEmail!.mockResolvedValue(null);
      usersService.create!.mockResolvedValue(mockUser);

      const result = await service.signup({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'password123',
      });

      expect(result.access_token).toBe('jwt-token');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw ConflictException if email exists', async () => {
      usersService.findByEmail!.mockResolvedValue(mockUser);

      await expect(
        service.signup({
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'password123',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should return token for valid credentials', async () => {
      usersService.findByEmailWithPassword!.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.access_token).toBe('jwt-token');
      expect(result.user.email).toBe('test@example.com');
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      usersService.findByEmailWithPassword!.mockResolvedValue(null);

      await expect(
        service.login({ email: 'wrong@example.com', password: 'password123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      usersService.findByEmailWithPassword!.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({ email: 'test@example.com', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('getProfile', () => {
    it('should return user profile', async () => {
      usersService.findById!.mockResolvedValue(mockUser);

      const result = await service.getProfile('user-1');
      expect(result.email).toBe('test@example.com');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      usersService.findById!.mockResolvedValue(null);

      await expect(service.getProfile('nonexistent')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
