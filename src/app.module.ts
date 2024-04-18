import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { UserModule } from './user/user.module';
import { PostService } from './post/post.service';
import { PostModule } from './post/post.module';
import { UserInterceptor } from './user/interceptor/user.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, PostModule, PrismaModule],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
