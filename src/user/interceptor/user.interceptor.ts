import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

export class UserInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, handle: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const jwtToken = request.headers?.authorization?.split('Bearer ')?.[1];
    const user = await jwt.decode(jwtToken);
    request.user = user;
    
    return handle.handle();
  }
}