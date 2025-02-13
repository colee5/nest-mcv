import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  price: number;
  @Expose()
  year: number;
  @Expose()
  coordinates: { lat: number; lng: number };
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  mileage: number;

  //   @Transform(({ obj }: { obj: { user: UserDto } }) => obj.user.id)
  @Transform(({ obj }: { obj: { owner: User } }) => obj.owner?.id)
  @Expose()
  userId: number;
}
