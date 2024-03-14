import mongoose from "mongoose";
import { getNotFound } from "./testFunctions";
import app from "../app";
import { LoginResponse } from "../types/MessageTypes";
import { UserTest } from "../types/DBTypes";
import randomstring from "randomstring";
import { postUser } from "./userFunctions";

describe('Testing graphql api', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL as string);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // test not found
  it('responds with a not found message', async () => {
    await getNotFound(app);
  });

  // test create user
  let userData: LoginResponse;
  let userData2: LoginResponse;
  let adminData: LoginResponse;

  const testUser: UserTest = {
    user_name: 'Test User ' + randomstring.generate(7),
    password: 'testpassword',
    bio: 'test bio1',
  };

  const testUser2: UserTest = {
    user_name: 'Test User ' + randomstring.generate(7),
    password: 'testpassword',
    bio: 'test bio2',
  };

  // create first user
  it('should create a new user', async () => {
    await postUser(app, testUser);
  });
});