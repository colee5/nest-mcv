import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

// RandomBytes - how we generate the salt
// Scrypt - how we encrypt a password - async in nature
// Promisify - converts callback-based functions into promise-based ones, allowing use of async/await

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // Password hashing steps:
  // 1. Generate a random salt
  // 2. Hash the password with the salt using scrypt
  // 3. Combine the salt and hashed password with a separator
  // 4. Create and save the new user

  async signup(email: string, password: string) {
    const user = await this.usersService.find(email);

    if (user.length) {
      throw new BadRequestException('email in use');
    }

    // Generate salt and hash password
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const newUser = await this.usersService.create(email, result);
    return newUser;
  }

  // Signin steps:
  // 1. If no user found, throw error
  // 2. Split stored password into salt and hash
  // 3. Hash the provided password with the stored salt
  // 4. Compare new hash with stored hash

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);

    if (!user) {
      throw new NotFoundException('User not registered');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    } else {
      console.log(`User just logged in with id ${user.id}`);
      return user;
    }
  }
}
