import request from 'supertest';
import randomstring from 'randomstring';
import {Application} from 'express';
import { ReviewTest, UserTest } from '@/types/DBTypes';
import { LoginResponse } from '@/types/MessageTypes';

const postReview = (
  url: string | Application,
  review: ReviewTest,
): Promise<ReviewTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Mutation($input: ReviewInput) {
            createReview(input: $input) {
                id
                text
                game
                author
                score
                }
            }`,
        variables: {
          input: review,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const reviewData = response.body.data.createReview;
          expect(reviewData.text).toBe(review.text);
          expect(reviewData.game).toBe(review.game);
          expect(reviewData.author).toBe(review.author);
          expect(reviewData.score).toBe(review.score);
          resolve(response.body.data.createReview);
        }
      });
  });
};

export {
    postReview
};