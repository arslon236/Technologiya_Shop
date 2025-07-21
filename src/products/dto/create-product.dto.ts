import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;

  @IsOptional()
  @IsEnum(['black', 'white', 'red', 'yellow', 'gray'])
  color?: string;

  @IsOptional()
  @IsEnum([128, 256, 512, 1024])
  storage?: number;

  @IsOptional()
  @IsNumber()
  Screen_size?: number;

  @IsOptional()
  @IsNumber()
  battery?: number;

  @IsOptional()
  @IsNumber()
  ram?: number;

    @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsString({ each: true })
  images?: string[];
}
