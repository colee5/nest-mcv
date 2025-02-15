import { Expose, Transform } from 'class-transformer';
import { User } from 'src/users/user.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  approved: boolean;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  //   @Transform(({ obj }: { obj: { user: UserDto } }) => obj.user.id)
  @Transform(({ obj }: { obj: { owner: User } }) => obj.owner?.id)
  @Expose()
  userId: number;
}
