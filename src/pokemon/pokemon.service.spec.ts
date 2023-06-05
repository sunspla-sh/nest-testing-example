import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
// import { HttpModule } from '@nestjs/axios'; //we don't need this because we are mocking the HttpService instead of using the real module and service
import { HttpService } from '@nestjs/axios';
import { createMock, DeepMocked } from '@golevelup/ts-jest';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let httpService: DeepMocked<HttpService>;

  beforeEach(async () => {
    /**
     * We don't need to use this because we can mock the HttpService instead of using the real module and service
     */

    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [HttpModule],
    //   providers: [PokemonService],
    // }).compile();

    /**
     * This is an acceptable way to mock when we only have a few dependencies
     */

    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [
    //     PokemonService,
    //     {
    //       provide: HttpService,
    //       useValue: createMock<HttpService>(),
    //     },
    //   ],
    // }).compile();

    /**
     * The .useMocker() method along with the createMock function automatically mocks all dependencies,
     * which saves us from needing to define them by hand as we did in the previous examples. Not a big deal if
     * we only have a few dependencies, but it can make a big difference in a larger project.
     */
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService],
    })
      .useMocker(createMock)
      .compile();

    pokemonService = module.get<PokemonService>(PokemonService);
    httpService = module.get(HttpService);
  });

  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
  });

  /**
   * for the getPokemon(id: string) method, we should test the following cases:
   * 1. an ID less than 1 should return a BadRequestException
   * 2. an ID greater than 151 should return a BadRequestException
   * 3. an ID between 1 and 151 (inclusive) should return the name of the respective pokemon
   * 4. a response from the pokemon api in a format that we don't expect should return an InternalServerErrorException
   */
  describe('getPokemon', () => {
    it('should throw error for pokemon ID less than 1', async () => {
      //Arrange
      const id = 0;
      //Act
      const getPokemon = pokemonService.getPokemon(id);
      //Assert
      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should throw error for pokemon ID greater than 151', async () => {
      //Arrange
      const id = 152;
      //Act
      const getPokemon = pokemonService.getPokemon(id);
      //Assert
      await expect(getPokemon).rejects.toBeInstanceOf(BadRequestException);
    });

    it('should return name of pokemon for pokemon ID between 1 and 151 (inclusive)', async () => {
      //Arrange
      httpService.axiosRef.mockResolvedValueOnce({
        data: {
          species: {
            name: 'bulbasaur',
          },
        },
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });
      const id = 1; //bulbasaur is pokemon number 1 out of 151

      //Act
      const getPokemon = pokemonService.getPokemon(id);

      //Assert
      await expect(getPokemon).resolves.toBe('bulbasaur');
    });

    it('should throw error for unexpected response data', async () => {
      //Arrange
      httpService.axiosRef.mockResolvedValueOnce({
        data: 'random junk not in the right format',
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });

      const id = 1;

      const getPokemon = pokemonService.getPokemon(id);

      await expect(getPokemon).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
