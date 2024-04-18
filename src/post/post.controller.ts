import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { Roles } from 'src/decorators/roles.decorator';
import { User, UserInfo } from 'src/user/decorators/user.decorator';
import { CreatePostDto, DeletePostResponseDto, PostResponseDto, UpdatePostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Roles(UserType.MEMBER, UserType.ADMIN)
  @Get() 
  async getAllPost(): Promise<PostResponseDto[]> {
    return this.postService.getAllPosts();
  }

  @Roles(UserType.MEMBER, UserType.ADMIN)
  @Post()
  createPost(
    @Body() body: CreatePostDto,
    @User() user: UserInfo
  ): Promise<PostResponseDto> {
    return this.postService.createPost(user.id, body);
  };

  @Roles(UserType.MEMBER, UserType.ADMIN)
  @Get(':id') 
  viewPost(@Param('id', ParseIntPipe) postId: number): Promise<PostResponseDto> {
    return this.postService.viewPost(postId);
  }

  @Roles(UserType.MEMBER, UserType.ADMIN)
  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) postId: number,
    @Body() body: UpdatePostDto,
    @User() user: UserInfo
  ): Promise<PostResponseDto> {
    const postUser = await this.postService.getUserByPost(postId);
    if(postUser.id !== user.id) throw new UnauthorizedException();

    return this.postService.updatePost(postId, body);
  };

  @Roles(UserType.MEMBER, UserType.ADMIN)
  @Delete(':id')
  async deletePost(
    @Param('id', ParseIntPipe) postId: number,
    @User() user: UserInfo
  ): Promise<DeletePostResponseDto> {
    const postUser = await this.postService.getUserByPost(postId);
    if(postUser.id !== user.id) throw new UnauthorizedException();

    return this.postService.deletePost(postId);
  };
}
