import { Type } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsObject,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class Coordinates {
  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;
}

export class CreateReportDto {
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;

  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @IsObject()
  @ValidateNested() // Tells validatorr to check inside the object
  @Type(() => Coordinates) // Transforms the input into Coordinates instance
  coordinates: Coordinates;
}
