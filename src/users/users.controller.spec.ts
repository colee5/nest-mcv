import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'email@', password: 'af' } as User);
      },
      find: (emai: string) => {
        return Promise.resolve([
          { id: 1, email: 'email@', password: 'af' } as User,
        ]);
      },
      remove: (id: number) => {
        return Promise.resolve({ id, email: 'email@', password: 'af' } as User);
      },
      update: (id: number, attrs: Partial<User>) => {
        return Promise.resolve({
          id,
          email: attrs.email || 'email@',
          password: attrs.password || 'af',
        } as User);
      },
    };

    fakeAuthService = {
      signin: async (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      signup: async (email: string, password: string) => {
        const fakeHashedPassword = 'fakesalt.fakehash';
        return Promise.resolve({
          id: 1,
          email,
          password: fakeHashedPassword,
        } as User);
      },
    };

    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUsers throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it('Sign in updates session object and returns user', async () => {
    const session = { userId: -1 };
    const user = await controller.signin(
      { email: 'email@', password: 'af' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
