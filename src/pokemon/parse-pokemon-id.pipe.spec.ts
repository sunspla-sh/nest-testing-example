import { ParsePokemonIdPipe } from './parse-pokemon-id.pipe';

describe('ParsePokemonIdPipe', () => {
  let pipe: ParsePokemonIdPipe;

  beforeEach(() => {
    pipe = new ParsePokemonIdPipe();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  describe('transform', () => {
    it('should throw error for non-numeric strings', () => {
      //Arrange
      const nonNumericString = 'hahaha';
      //Act
      const t = () => pipe.transform(nonNumericString);
      //Assert
      expect(t).toThrowError();
    });
    it('should throw error if numeric string (pokemon id) less than 1', () => {
      //Arrange
      const idLessThanOne = '0';
      //Act
      const t = () => pipe.transform(idLessThanOne);
      //Assert
      expect(t).toThrowError();
    });
    it('should throw error if numeric string (pokemon id) greater than 151', () => {
      //Arrange
      const idGreaterThanOneFiftyOne = '152';
      // Act
      const t = () => pipe.transform(idGreaterThanOneFiftyOne);
      // Assert
      expect(t).toThrowError();
    });
    it('should return number if numeric string (pokemon id) between 1 and 151', () => {
      // Arrange
      const idBetweenOneAndOneFiftyOne = '2';
      const numeric = parseInt(idBetweenOneAndOneFiftyOne);
      // Act
      const val = pipe.transform(idBetweenOneAndOneFiftyOne);
      // Assert
      expect(val).toBe(numeric);
    });
  });
});
