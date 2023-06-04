import { Test, TestingModule } from '@nestjs/testing';
import { TweetsService } from './tweets.service';

describe('TweetsService', () => {
  let service: TweetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TweetsService],
    }).compile();
    service = module.get<TweetsService>(TweetsService);
  });

  describe('createTweet', () => {
    it('should create tweet', () => {
      //Arrange
      const payload = 'This is my tweet';

      //Act
      const tweet = service.createTweet(payload);

      //Assert
      expect(tweet).toBe(payload);
      expect(service.tweets).toHaveLength(1);
    });

    it('should prevent tweets over 100 characters', () => {
      //Arrange
      const payload =
        'This is a long tweet over 100 characters... This is a long tweet over 100 characters... This is a long tweet over 100 characters';

      //Act
      const tweet = () => {
        return service.createTweet(payload);
      };

      //Assert
      expect(tweet).toThrowError();
    });
  });

  describe('updateTweet', () => {
    it('should prevent tweets over 100 characters', () => {
      //Arrange
      service.tweets = ['hello'];
      const payload =
        'This is a long tweet over 100 characters... This is a long tweet over 100 characters... This is a long tweet over 100 characters';
      //Act
      const update = () => {
        return service.updateTweet(payload, 0);
      };

      expect(update).toThrowError();
    });

    it('should prevent updating a tweet that does not exist', () => {
      //Arrange
      service.tweets = ['sup'];
      const payload = 'newly updated tweet';
      const idThatDoesDefinitelyNotExist = 5;

      //Act
      const update = () => {
        return service.updateTweet(payload, idThatDoesDefinitelyNotExist);
      };

      //Assert
      expect(update).toThrowError();
    });

    it('should update existing tweet if updated message is less than 100 characters', () => {
      //Arrange
      service.tweets = ['hello there'];
      const payload = 'hola amigo';
      const idThatDefinitelyExists = 0;

      //Act
      const updatedTweet = service.updateTweet(payload, idThatDefinitelyExists);

      //Asset
      expect(updatedTweet).toBe(payload);
    });
  });

  describe('getTweets', () => {
    it('should return an array of tweets', () => {
      //Arrange
      service.tweets = ['hi'];

      //Act
      const tweets = service.getTweets();

      //Assert
      expect(tweets).toBe(service.tweets);
    });
  });

  describe('deleteTweet', () => {
    it('should prevent deleting a tweet that does not exist', () => {
      //Arrange
      service.tweets = ['hi'];
      const idThatDefinitelyDoesNotExist = 5;

      //Act
      const d = () => {
        return service.deleteTweet(idThatDefinitelyDoesNotExist);
      };

      //Assert
      expect(d).toThrowError();
    });
    it('should delete tweet by id', () => {
      //Arrange
      service.tweets = ['hi', 'yo', 'sup'];
      const idThatDefinitelyExists = 1;
      const tweetToBeDeleted = service.tweets[idThatDefinitelyExists];
      const tweetsArrayLengthBeforeDeletion = service.tweets.length;

      //Act
      const d = service.deleteTweet(idThatDefinitelyExists);

      //Assert
      expect(d).toBe(tweetToBeDeleted);
      expect(service.tweets).toHaveLength(tweetsArrayLengthBeforeDeletion - 1);
    });
  });
});
