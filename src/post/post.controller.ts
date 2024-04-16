import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreatePostDto, PostResponseDto, UpdatePostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get() 
  async getAllPost(): Promise<PostResponseDto[]> {
    return this.postService.getAllPosts();
  }

  @Post()
  createPost(@Body() body: CreatePostDto): Promise<PostResponseDto> {
    return this.postService.createPost(body);
  };

  @Get(':id') 
  viewPost(@Param('id', ParseIntPipe) postId: number): Promise<PostResponseDto> {
    return this.postService.viewPost(postId);
  }

  @Put(':id')
  updatePost(
    @Param('id', ParseIntPipe) postId,
    @Body() body: UpdatePostDto
  ): Promise<PostResponseDto> {
    return this.postService.updatePost(postId, body);
  };

  @Delete(':id')
  deletePost(): string {
    return 'delete a post';
  };
}
