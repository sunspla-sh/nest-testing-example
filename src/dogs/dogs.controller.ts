import { Controller, Get } from '@nestjs/common';
import { DogsService } from './dogs.service';

@Controller('Dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Get()
  findAll(): Array<string> {
    return this.dogsService.findAll();
  }
}
