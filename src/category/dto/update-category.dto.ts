import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsOptional()
    @IsString({ message: '❗ Kategoriya nomi matn bo‘lishi kerak' })
    @IsNotEmpty({ message: '❗ Kategoriya nomi bo‘sh bo‘lmasligi kerak' })
    title?: string
}