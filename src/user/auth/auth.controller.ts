import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { User, UserInfo } from '../decorators/user.decorator';
import { SigninDto, SignupDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @Post('/signin')
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body);
  }

  @Roles(UserType.MEMBER, UserType.ADMIN)
  @Get('/me')
  me(@User() user: UserInfo) {
    return user;
  }
}
