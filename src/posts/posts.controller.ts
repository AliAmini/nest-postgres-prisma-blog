import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  @Get() 
  getAllPosts(): string {
    return 'All Posts';
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
