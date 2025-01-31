import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

// 1. POST /auth/signup -> Create a new user
// 2. GET /auth/:id/ -> Find a user with given id
// 3. GET /auth?email-... -> Find all users with given email
// 4. PATCH /auth/:id -> Update a user with given ID
// 5. DELETE /auth/:id -> Delete a user with given ID

@Controller('auth')
export class UsersController {
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
  }
}
