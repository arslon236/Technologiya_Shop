import { Type } from 'class-transformer';
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


    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number) // ⭐️ BU YERDA MUAMMO BO‘LGAN
    price: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;


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
