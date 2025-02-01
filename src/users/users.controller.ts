import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

// 1. POST /auth/signup -> Create a new user
// 2. GET /auth/:id/ -> Find a user with given id
// 3. GET /auth?email-... -> Find all users with given email
// 4. PATCH /auth/:id -> Update a user with given ID
// 5. DELETE /auth/:id -> Delete a user with given ID

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    this.usersService.remove(id);
  }
}
