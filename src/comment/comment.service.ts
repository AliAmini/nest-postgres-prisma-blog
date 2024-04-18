import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentResponseDto, CreateCommentDto } from './dtos/comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(userId: number, postId: number, commentContent: string): Promise<CommentResponseDto> {
    const comment = await this.prismaService.comment.create({
      data: {
        content: commentContent,
        user_id: userId,
        post_id: postId
      }
    });

    return new CommentResponseDto(comment);
  }
}
