/* eslint-disable node/no-unpublished-import */
import {Application} from 'express';
import request from 'supertest';

const getNotFound = (url: string | Application) => {
  return new Promise((resolve, reject) => {
    request(url)
      .get('/what-is-this')
      .expect(404, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.body);
        }
      });
  });
};

export {getNotFound};
