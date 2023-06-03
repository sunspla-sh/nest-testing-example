import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let catsService: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();
    catsService = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(catsService).toBeDefined();
  });

  it("should return ['bob','jim']", () => {
    expect(catsService.findAll()).toEqual(['bob', 'jim']);
  });
});
