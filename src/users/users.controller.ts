import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

// 1. POST /auth/signup -> Create a new user
// 2. POST /auth/signin -> Create a new user
// 3. POST /auth/signout -> Sign out a user
// 4. POST /auth/me -> Return a user's object
// 5. GET /auth/:id/ -> Find a user with given id
// 6. GET /auth?email-... -> Find all users with given email
// 7. PATCH /auth/:id -> Update a user with given ID
// 8. DELETE /auth/:id -> Delete a user with given ID

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('/me')
  async me(@CurrentUser() user: User) {
    return user;
  }

  @UseGuards(AuthGuard)
  @Post('/signout')
  async signOut(@Session() session: any) {
    if (!session.userId) {
      throw new NotFoundException(`User not found or already signed out`);
    }
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`);
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
