import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostResponseDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts(): Promise<PostResponseDto[]> {
    const posts = await this.findManyPosts();

    return posts.map(post => new PostResponseDto({...post, comments_count: post.comments.length}));
  }


  private findManyPosts(): Promise<Partial<Post>[]> {
    return this.prismaService.post.findMany({
      where: {},
      select: {
        id: true,
        title: true,
        description: true,
        article: true,
        views_count: true,
        created_at: true,

        user: {
          select: {
            id: true,
            name: true,
          }
        },

        tags: {
          select: {
            title: true
          }
        },

        comments: {
          select: {
            id: true
          }
        }
      }
    });
  }
}
