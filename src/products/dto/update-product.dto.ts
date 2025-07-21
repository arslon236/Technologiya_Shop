import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  price?: string;

  @IsOptional()
  @IsEnum(['black', 'white', 'red', 'yellow', 'gray'])
  color?: string;

  @IsOptional()
  @IsEnum([128, 256, 512, 1024])
  storage?: number;

  @IsOptional()
  @IsNumber()
  @Min(3)
  @Max(10)
  Screen_size?: number;

  @IsOptional()
  @IsNumber()
  battery?: number;

  @IsOptional()
  @IsNumber()
  ram?: number;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
