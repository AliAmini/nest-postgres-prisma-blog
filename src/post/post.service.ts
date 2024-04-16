import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostResponseDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts(): Promise<PostResponseDto[]> {
    const posts = await this.prismaService.post.findMany({
      where: {},
      include: {
        user: true,
        tags: true,
        comments: true,
      },
    });

    return posts.map(post => new PostResponseDto({...post, comments_count: post.comments.length}));
  }


}
