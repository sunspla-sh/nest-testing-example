import { Injectable } from '@nestjs/common';

@Injectable()
export class TweetsService {
  tweets: string[] = [];

  createTweet(tweet: string): string {
    if (tweet.length > 100) {
      throw new Error('Tweet too long');
    }
    this.tweets.push(tweet);
    return tweet;
  }

  updateTweet(tweet: string, id: number): string {
    const tweetToUpdate = this.tweets[id];

    if (!tweetToUpdate) {
      throw new Error('This tweet does not exist');
    }
    if (tweet.length > 100) {
      throw new Error('Tweet too long');
    }
    this.tweets[id] = tweet;
    return tweet;
  }

  getTweets(): string[] {
    return this.tweets;
  }

  deleteTweet(id: number): string {
    const tweetToDelete = this.tweets[id];
    if (!tweetToDelete) {
      throw new Error('This tweet does not exist');
    }
    const deletedTweet = this.tweets.splice(id, 1)[0];
    return deletedTweet;
  }
}
