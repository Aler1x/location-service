import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  coordinates: number[];

  @IsNotEmpty()
  @IsString()
  type: string;
}
