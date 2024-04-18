import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EMAIL } from './enum/email.enum';

interface SendCommentEmailParams {
  userName: string;
  userEmail: string;
  postTitle: string;
}

@Injectable()
export class EmailService {
  constructor(@InjectQueue(EMAIL) private readonly emailQueue: Queue) {}

  async sendCommentEmail({postTitle, userEmail, userName}: SendCommentEmailParams) {
    await this.emailQueue.add(EMAIL, {
      subject: `New comment for post ${postTitle}`,
      to: userEmail,
      text: `Hi ${userName}, you have a new comment for post ${postTitle}`
    });
  }
}
