import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostResponseDto, TagResponseDto } from './dto/post.dto';

interface CreatePostParams {
  title: string;
  description: string;
  article: string;
  tags: string[];
}

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

  async createPost({title, article, description, tags}: CreatePostParams): Promise<PostResponseDto> {
    const userId = 1

    const post = await this.prismaService.post.create({
      data: {
        title, 
        article, 
        description,
        user_id: userId
      }
    });

    const tagsData = tags.map(tagTitle => ({
      title: tagTitle,
      post_id: post.id
    }));

    const createdTags = await this.prismaService.tag.createMany({data: tagsData});

    return new PostResponseDto({
      ...post, 
      tags: tagsData.map(tag => new TagResponseDto(tag))
    });
  }

}
