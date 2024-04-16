import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { PostResponseDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get() 
  async getAllPost(): Promise<PostResponseDto[]> {
    return this.postService.getAllPosts();
  }

  @Post()
  createPost(): string {
    return 'Create a new post';
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
