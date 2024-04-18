import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EMAIL } from './enum/email.enum';

interface SendCommentEmailParams {
  postCreatorName: string;
  postCreatorEmail: string;
  postTitle: string;
}

@Injectable()
export class EmailService {
  constructor(@InjectQueue(EMAIL) private readonly emailQueue: Queue) {}

  async sendCommentEmail({postTitle, postCreatorEmail, postCreatorName}: SendCommentEmailParams) {
    await this.emailQueue.add(EMAIL, {
      subject: `New comment for post ${postTitle}`,
      to: postCreatorEmail,
      text: `Hi ${postCreatorName}, you have a new comment for post ${postTitle}`
    });
  }
}
