import { Controller, Body, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { User, UserInfo } from 'src/user/decorators/user.decorator';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Roles(UserType.MEMBER, UserType.ADMIN)
  @Get('post/:postId')
  getComments(
    @Param('postId', ParseIntPipe) postId: number
  ) {
    return this.commentService.getComments(postId);
  }


  @Roles(UserType.MEMBER, UserType.ADMIN)
  @Post('post/:postId')
  createComment(
    @Body() {content}: CreateCommentDto,
    @Param('postId', ParseIntPipe) postId: number,
    @User() user: UserInfo
  ) {
    return this.commentService.createComment(user.id, postId, content);
  }


}
