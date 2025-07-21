import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from '../utils/file-upload.utils';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new product with optional images (1-5)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Product with image upload',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'iPhone 14 Pro' },
        description: {
          type: 'string',
          example: 'Latest Apple iPhone with 256GB storage',
        },
        price: { type: 'string', example: '1499.99' },
        categoryId: { type: 'number', example: 1 },
        color: { type: 'string', example: 'black' },
        storage: { type: 'number', example: 256 },
        Screen_size: { type: 'number', example: 6.1 },
        battery: { type: 'number', example: 4200 },
        ram: { type: 'number', example: 6 },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          minItems: 1,
          maxItems: 5,
        },
      },
      required: ['title', 'description', 'price', 'categoryId'],
    },
  })
  @ApiResponse({ status: 201, description: 'Product successfully created' })
  @UseInterceptors(
    FilesInterceptor('images', 5, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}-${file.originalname}`;
          cb(null, uniqueName);
        },
      }),
      fileFilter: imageFileFilter,
    }),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.productService.create(createProductDto, images);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'List of products returned' })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one product by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      example1: {
        summary: 'Update title and price',
        value: {
          title: 'iPhone 14 Pro Max',
          price: '1599.99',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Product successfully updated' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Product successfully deleted' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }

  // product.controller.ts

  @Get('latest') 
  getLatestProducts() {
    return this.productService.getLatestProducts();
  }

}
