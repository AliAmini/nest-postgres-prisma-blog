import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [PrismaModule, EmailModule],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
