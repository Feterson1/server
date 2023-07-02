import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'ssss!';
  }
  getProfile(): string {
    return 'It\'s my profile!';
  }
}
