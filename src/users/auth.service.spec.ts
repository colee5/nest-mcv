import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

it('can create an instance of auth service', async () => {
  // Create fake copy of the UsersService
  // We declare all the methods which the UsersService has

  const fakeUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };

  const module = await Test.createTestingModule({
    providers: [
      {
        provide: UsersService,
        useValue: fakeUsersService,
      },
      AuthService,
    ],
  }).compile();

  const service = module.get(AuthService);
  expect(service).toBeDefined();
});
