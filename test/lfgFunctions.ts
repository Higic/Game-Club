import request from 'supertest';
import {Application} from 'express';
import { LFGTest } from '@/types/DBTypes';

const postLfg = (
  url: string | Application,
  lfg: LFGTest,
): Promise<LFGTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Mutation($input: LFGInput) {
            createLfg(input: $input) {
                id
                text
                game
                author
                }
            }`,
        variables: {
          input: lfg,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const lfgData = response.body.data.createLfg;
          expect(lfgData.text).toBe(lfg.text);
          expect(lfgData.game).toBe(lfg.game);
          expect(lfgData.author).toBe(lfg.author);
          resolve(response.body.data.createLfg);
        }
      });
  });
  
};

const deleteLfg = (
  url: string | Application,
  id: string,
): Promise<LFGTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Mutation($deleteLfgId: String!) {
            deleteLfg(id: $deleteLfgId) {
            id
            text
            game
            author
            }
        }`,
        variables: {
          deleteLfgId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedLfg = response.body.data.deleteLfg;
          expect(deletedLfg.id).toBe(id);
          resolve(deletedLfg);
        }
      });
  });
};

const getLfgByGame = (
  url: string | Application,
  gameId: string,
): Promise<LFGTest[]> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `query Query($lfgByGame: String!) {
            lfgByGame(game: $lfgByGame) {
                id
                game
                author
                text
            }
            }`,
        variables: {
          lfgByGame: gameId,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const lfg = response.body.data.lfgByGame;
          console.log(lfg);
          expect(lfg).toBeInstanceOf(Array);
          expect(lfg.length).toBeGreaterThan(0);
          expect(lfg[0]).toHaveProperty('id');
          expect(lfg[0]).toHaveProperty('game');
          expect(lfg[0]).toHaveProperty('author');
          expect(lfg[0]).toHaveProperty('text');
          resolve(response.body.data.lfgByGame);
        }
      });
  });
};

export {
    postLfg,
    deleteLfg,
    getLfgByGame
};