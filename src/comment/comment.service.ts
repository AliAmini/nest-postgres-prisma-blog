import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentResponseDto, CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService
  ) {}

  async getComments(postId: number): Promise<CommentResponseDto[]> {
    const comments = await this.prismaService.comment.findMany({
      where: {post_id: postId},
      include: {
        user: true,
      },
    });
    
    return comments.map((comment) => new CommentResponseDto(comment));
  }

  async createComment(userId: number, postId: number, commentContent: string): Promise<CommentResponseDto> {
    // create comment
    const comment = await this.prismaService.comment.create({
      data: {
        content: commentContent,
        user_id: userId,
        post_id: postId
      }
    });

    // send email notification to user
    await this.sendEmailNotification(postId);

    return new CommentResponseDto(comment);
  }

  private async sendEmailNotification(postId: number) {
    const post = await this.prismaService.post.findUnique({
      where: {id: postId},
      select: {
        title: true,
        user: true
      }
    });

    // send email notification to queue
    await this.emailService.sendCommentEmail({
      postTitle: post.title,
      postCreatorEmail: post.user.email,
      postCreatorName: post.user.name
    });
  }
}
