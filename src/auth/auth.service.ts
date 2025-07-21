import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { Auth } from './entity/auth.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly AuthRepo: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
  const candidate = await this.AuthRepo.findOne({ where: { email: dto.email } });
  if (candidate) {
    throw new BadRequestException('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const user = this.AuthRepo.create({
    username: dto.username, // yangi qo‘shildi
    email: dto.email,
    password: hashedPassword,
    role: dto.role || 'user', // role optional, default 'user'
  });

  const savedUser = await this.AuthRepo.save(user);
  return { user: savedUser };
}







  async login(dto: LoginDto) {
    const user = await this.AuthRepo.findOne({ where: { email: dto.email } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.generateToken(user);
    return { user, token };
  }

  async generateToken(user: Auth) {
    const payload = {
      sub: user.id,
      email: user.email
    };

    return this.jwtService.signAsync(payload);
  }
}
