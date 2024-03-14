import request from 'supertest';
import randomstring from 'randomstring';
import {Application} from 'express';
import { ReviewModify, ReviewTest, UserTest } from '@/types/DBTypes';
import { LoginResponse } from '@/types/MessageTypes';
import { url } from 'inspector';

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

const deleteReview = (
  url: string | Application,
  id: string,
): Promise<ReviewTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Mutation($deleteReviewId: ID!) {
          deleteReview(id: $deleteReviewId) {
            id
            text
            score
            game
            author
          }
        }`,
        variables: {
          deleteReviewId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedReview = response.body.data.deleteReview;
          expect(deletedReview.id).toBe(id);
          resolve(deletedReview);
        }
      });
  });
};

const getReviewsByGame = (
  url: string | Application,
  gameId: string,
): Promise<ReviewTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query Query($reviewsByGame: String!) {
          reviewsByGame(game: $reviewsByGame) {
            id
            game
            author
            score
            text
          }
        }`,
        variables: {
          reviewsByGame: gameId,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const reviews = response.body.data.reviewsByGame;
          console.log(reviews);
          expect(reviews).toBeInstanceOf(Array);
          expect(reviews.length).toBeGreaterThan(0);
          expect(reviews[0]).toHaveProperty('id');
          expect(reviews[0]).toHaveProperty('game');
          expect(reviews[0]).toHaveProperty('author');
          expect(reviews[0]).toHaveProperty('score');
          expect(reviews[0]).toHaveProperty('text');
          resolve(response.body.data.reviewsByGame);
        }
      });
  });
};

const putReview = (
  url: string | Application,
  id: string,
) => {
  return new Promise((resolve, reject) => {
    const newText = 'Review update ' + randomstring.generate(7);
    const newScore = Math.floor(Math.random() * 5) + 1;
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Mutation($updateReviewId: ID!, $input: ReviewModify) {
          updateReview(id: $updateReviewId, input: $input) {
            id
            text
            score
            game
            author
          }
        }`,
        variables: {
          updateReviewId: id,
          input: { text: newText, score: newScore },
        },
        })
        .expect(200, (err, response) => {
          if (err) {
            reject(err);
          } else {
            const updatedReview = response.body.data.updateReview;
            expect(updatedReview).toHaveProperty(id);
            expect(updatedReview).toHaveProperty('text');
            expect(updatedReview).toHaveProperty('score');
            expect(updatedReview.text).toBe(newText);
            expect(updatedReview.score).toBe(newScore);
            resolve(updatedReview);
          }
        });
    });
};
        

export {
    postReview,
    deleteReview,
    getReviewsByGame,
    putReview
};