import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as jwt from "jsonwebtoken";
import { PrismaService } from "src/prisma/prisma.service";

interface JwtPayload {
  id: number;
  name: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, 
    private readonly prismaService: PrismaService
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass()
    ]);

    if(roles?.length > 0) {
      const request = context.switchToHttp().getRequest();
      const jwtToken = request.headers?.authorization?.split('Bearer ')?.[1];
      try {
        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET) as JwtPayload;
        const user = await this.prismaService.user.findUnique({
          where: {id: payload.id}
        });

        if(!user) return false;
        if(!roles.includes(user.userType)) return false;
      } catch(e) {
        return false;
      }
    }

    return true;
  }
}