import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CommentResponseDto {
  id: number;
  post_id: number;
  content: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;


  constructor(comment: Partial<CommentResponseDto>) {
    Object.assign(this, comment);
  }
}