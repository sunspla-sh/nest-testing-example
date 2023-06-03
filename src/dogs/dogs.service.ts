import { Injectable } from '@nestjs/common';

@Injectable()
export class DogsService {
  private dogs: Array<string> = ['tim', 'mac'];

  findAll(): Array<string> {
    return this.dogs;
  }
}
