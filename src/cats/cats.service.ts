import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private cats: Array<string> = ['bob', 'jim'];

  findAll(): Array<string> {
    return this.cats;
  }
}
