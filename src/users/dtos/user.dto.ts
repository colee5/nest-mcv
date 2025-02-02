import { Expose } from 'class-transformer';

export class UserDto {
  // Only expose ID, email in the interceptor
  // We can also call this class - UserResponseDto,
  @Expose()
  id: number;

  @Expose()
  email: string;
}
