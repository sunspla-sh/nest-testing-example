import {
  Controller,
  Get,
  Param,
  // ParseIntPipe
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { ParsePokemonIdPipe } from './parse-pokemon-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  /**
   * An example using the nestjs built-in ParseIntPipe
   */
  // @Get(':id')
  // getPokemon(@Param('id', ParseIntPipe) id: number) {
  //   return this.pokemonService.getPokemon(id);
  // }

  /**
   * An example using our custom ParsePokemonIdPipe
   */
  @Get(':id')
  getPokemon(@Param('id', ParsePokemonIdPipe) id: number) {
    return this.pokemonService.getPokemon(id);
  }
}
