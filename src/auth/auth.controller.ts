import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Auth') // Swagger bo‘lim nomi
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli ro‘yxatdan o‘tdi' })
  @ApiBody({
    type: RegisterDto,
    examples: {
      default: {
        summary: 'Oddiy foydalanuvchi',
        value: {
          username: 'arslon',
          email: 'arslonmaxmudov236@gmail.com',
          password: 'arslon12345',
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
          email: 'arslonmaxmudov236@gmail.com',
          password: 'arslon12345',
        },
      },
    },
  })
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }


  @Get('users')
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchilar ro‘yxati' })
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}
