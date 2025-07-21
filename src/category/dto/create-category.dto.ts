import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({ message: '❗ Kategoriya nomi matn bo‘lishi kerak' })
    @IsNotEmpty({ message: '❗ Kategoriya nomi bo‘sh bo‘lmasligi kerak' })
    title: string
}