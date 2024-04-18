import { UserType } from "@prisma/client";
import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;
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

export class CommentResponseDto {
  id: number;
  
  @Exclude()
  post_id: number;
  
  content: string;

  created_at: Date;

  user: {
    id: number;
    name: string;
  }

  @Exclude()
  user_id: number;
  
  @Exclude()
  updated_at: Date;


  constructor(comment: Partial<CommentResponseDto>) {
    Object.assign(this, comment);
    this.user = new UserResponseDto(comment.user);
  }
}