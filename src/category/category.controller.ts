import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Category') // Swaggerda kategoriya bo‘limi nomi
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi kategoriya yaratish' })
  @ApiResponse({ status: 201, description: 'Kategoriya yaratildi' })
  @ApiBody({
    type: CreateCategoryDto,
    examples: {
      example1: {
        summary: 'Oddiy misol',
        value: {
          title: 'Smartfonlar',
        },
      },
    },
  })
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha kategoriyalarni olish' })
  @ApiResponse({ status: 200, description: 'Kategoriyalar ro‘yxati' })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha kategoriya olish' })
  @ApiParam({ name: 'id', required: true, description: 'Kategoriya IDsi' })
  @ApiResponse({ status: 200, description: 'Kategoriya topildi' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Kategoriya yangilash' })
  @ApiParam({ name: 'id', required: true, description: 'Kategoriya IDsi' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Kategoriya yangilandi' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.categoryService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kategoriya o‘chirish' })
  @ApiParam({ name: 'id', required: true, description: 'Kategoriya IDsi' })
  @ApiResponse({ status: 200, description: 'O‘chirish funksiyasi yozilmagan' })
  async remove(@Param('id') id: string) {
    return { message: 'Kategoriya o‘chirish funksiyasi hali yozilmagan' };
  }
}
