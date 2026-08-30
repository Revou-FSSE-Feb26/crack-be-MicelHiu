import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly api_key:string = process.env.API_KEY ?? '';
  
  getHello(): string {
    return 'Hello World!';
  }
}
