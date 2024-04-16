import { Comment, Post, UserType } from "@prisma/client";
import { Exclude } from "class-transformer";


export class TagResponseDto {
  @Exclude()
  id: number;

  title: string;

  @Exclude()
  post_id: number;

  constructor(tag: Partial<TagResponseDto>) {
    Object.assign(this, tag);
  }
}

export class UserResponseDto {
  id: number;
  name: string;

  @Exclude()
  email: string;

  @Exclude()
  password:  string;

  @Exclude()
  userType: UserType;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  constructor(user: Partial<UserResponseDto>) {
    Object.assign(this, user);
  }
}

export class PostResponseDto {
  id: number;

  title: string;

  description: string;

  article: string;

  views_count: number;

  comments_count: number;

  @Exclude()
  updated_at: Date;

  @Exclude()
  comments: Partial<Comment>[];
  
  created_at: Date;

  user: {
    id: number;
    name: string;
  }

  tags: TagResponseDto[]

  constructor(post: Partial<PostResponseDto>) {    
    Object.assign(this, post);
    this.tags = post.tags.map(tag => new TagResponseDto(tag));
    this.user = new UserResponseDto(post.user);
  }
}

