import { Controller, Get, Post, Put, Delete, Body } from '@nestjs/common';
import { CreatePostDto, PostResponseDto } from './dto/post.dto';
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

  @Put(':id')
  updatePost(): string {
    return 'update a post';
  };

  @Delete(':id')
  deletePost(): string {
    return 'delete a post';
  };
}
