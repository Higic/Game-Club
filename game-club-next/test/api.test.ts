import {getNotFound} from './testFunctions';
import mongoose from 'mongoose';
import app from '../src/app';
import jwt from 'jsonwebtoken';

const uploadApp = process.env.UPLOAD_URL as string;

describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DB_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test not found
  it('responds with a not found message', async () => {
    await getNotFound(app);
  });
});