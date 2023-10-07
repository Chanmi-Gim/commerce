import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getName(str): string {
    return `나의 이름은 ${str}이야`;
  }
}
