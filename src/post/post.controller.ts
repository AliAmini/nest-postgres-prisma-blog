import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('post')
export class PostController {
  @Get() 
  getAllPost(): string {
    return 'All Post';
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
