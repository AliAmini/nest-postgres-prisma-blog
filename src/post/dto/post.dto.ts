import { Comment, Post } from "@prisma/client";
import { Exclude } from "class-transformer";

export class PostResponseDto {
  id: number;

  title: string;

  description: string;

  article: string;

  views_count: number;

  comments_count: number;

  @Exclude()
  comments: Partial<Comment>[];
  
  created_at: Date;

  user: {
    id: number;
    name: string;
  }

  tags: {title: string}[]

  constructor(post: Partial<PostResponseDto>) {    
    Object.assign(this, post);
  }
}