import { Test } from '@nestjs/testing';
import { DogsController } from './dogs.controller';
import { DogsService } from './dogs.service';

describe('DogsController', () => {
  let dogsController: DogsController;
  let dogsService: DogsService;

  beforeEach(async () => {
    /**
     * TestingModule inherits from ModuleRef, so it can dynamically resolve scoped providers (transient or request-scoped)
     * using the .resolve() method and static providers with the .get() method
     */
    const moduleRef = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [DogsService],
    }).compile();

    dogsService = moduleRef.get<DogsService>(DogsService);
    dogsController = moduleRef.get<DogsController>(DogsController);
  });

  describe('findAll', () => {
    it('it should return an array of dogs', async () => {
      const result = ['test'];
      jest.spyOn(dogsService, 'findAll').mockImplementation(() => result);

      expect(await dogsController.findAll()).toBe(result);
    });
  });
});
