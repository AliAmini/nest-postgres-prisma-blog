import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostResponseDto } from './dto/post.dto';

interface CreatePostParams {
  title: string;
  description: string;
  article: string;
  tags: string[];
}

interface UpdatePostParams {
  title?: string;
  description?: string;
  article?: string;
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

    const createdPost = await this.prismaService.post.create({
      data: {
        title, 
        article, 
        description,
        user_id: userId
      }
    });

    const tagsData = tags.map(tagTitle => ({
      title: tagTitle,
      post_id: createdPost.id
    }));

    const createdTags = await this.prismaService.tag.createMany({data: tagsData});

    return this.findAndResponseSinglePost(createdPost.id);
  }


  async updatePost(postId: number, data: UpdatePostParams): Promise<PostResponseDto> {
    const userId = 1;

    // Update the post
    const updatedPost = await this.prismaService.post.update({
      where: { id: postId },
      data
    });


    return this.findAndResponseSinglePost(updatedPost.id);
  }

  async viewPost(postId: number): Promise<PostResponseDto> {
    const post = await this.prismaService.post.findUnique({
      where: {id: postId},
      include: {
        user: true,
        tags: true,
        comments: true,
      }
    });
    if(!post) throw new NotFoundException('Post not found');

    await this.increasePostViewsCount(post.id);    
    
    return new PostResponseDto({...post, comments_count: post.comments.length, views_count: post.views_count+1});
  }

  private async increasePostViewsCount(postId: number): Promise<boolean> {
    const updateResult = await this.prismaService.post.update({
      where: { id: postId },
      data: { views_count: {increment: 1} }
    });

    console.log({updateResult});
    return Boolean(updateResult);
  }

  private async findAndResponseSinglePost(postId: number): Promise<PostResponseDto> {
    const post = await this.prismaService.post.findUnique({
      where: {id: postId},
      include: {
        user: true,
        tags: true,
        comments: true,
      }
    });
    return new PostResponseDto({...post, comments_count: post.comments.length});
  }
}
