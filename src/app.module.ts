import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PostsController } from './posts/posts.controller';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [AppService],
})
export class AppModule {}
