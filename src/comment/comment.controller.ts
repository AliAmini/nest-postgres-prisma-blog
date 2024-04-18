import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { User, UserInfo } from 'src/user/decorators/user.decorator';
import { CommentService } from './comment.service';
import { CommentResponseDto, CreateCommentDto } from './dtos/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('post/:postId')
  createComment(
    @Body() {content}: CreateCommentDto,
    @Param('postId', ParseIntPipe) postId: number,
    @User() user: UserInfo
  ) {
    return this.commentService.createComment(user.id, postId, content);
  }
}
