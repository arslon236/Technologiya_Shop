import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth') // Swagger bo‘lim nomi
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi' })
  @ApiBody({
    type: RegisterDto,
    examples: {
      default: {
        summary: 'Oddiy foydalanuvchi',
        value: {
          full_name: 'Ali Valiyev',
          email: 'ali@example.com',
          password: 'ali12345',
        },
      },
    },
  })
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Foydalanuvchini tizimga kiritish' })
  @ApiResponse({ status: 200, description: 'Token bilan qaytariladi' })
  @ApiBody({
    type: LoginDto,
    examples: {
      default: {
        summary: 'Login misoli',
        value: {
          email: 'ali@example.com',
          password: 'ali12345',
        },
      },
    },
  })
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
}
