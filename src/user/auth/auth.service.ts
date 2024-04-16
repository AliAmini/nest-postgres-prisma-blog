import { Injectable, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { User, UserType } from '@prisma/client';


interface SignupParams {
  email: string;
  password: string;
  name: string;
}

interface SigninParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup({email, password, name}: SignupParams) {
    const emailAlreadyExists = await this.checkEmailExists(email);
    if(emailAlreadyExists) throw new ConflictException(`${email} already exists`);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        userType: UserType.MEMBER
      }
    });

    const token = this.generateToken(user.id, user.name);

    return {token};
  }

  async signin({email, password}: SigninParams) {
    const user = await this.findUserByEmail(email);
    if(!user) throw new ForbiddenException(`Invalid credentials`);

    const hashedPassword = user.password;
    const isValidPassword = await bcrypt.compare(password, hashedPassword);
    if(!isValidPassword) throw new ForbiddenException(`Invalid credentials`);

    const token = this.generateToken(user.id, user.name); 
    
    return {token};
  }

  private async checkEmailExists(email: string): Promise<boolean> {
    const user = await this.findUserByEmail(email);

    return Boolean(user);
  }

  private generateToken(id: number, name: string): string {
    return jwt.sign(
      {
        id: id,
        name: name
      }, 
      process.env.JWT_SECRET, 
      {
        expiresIn: "7d"
      }
    );
  }

  private findUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({ 
      where: {email: email}
    });
  }
}
