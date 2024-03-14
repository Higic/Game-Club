import mongoose from "mongoose";
import { getNotFound } from "./testFunctions";
import app from "../app";
import { LoginResponse } from "../types/MessageTypes";
import { ReviewInput, UserTest } from "../types/DBTypes";
import randomstring from "randomstring";
import { getSingleUser, getUser, loginUser, postUser, putUser } from "./userFunctions";
import { postReview } from "./reviewFunctions";

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

  const testReview1: ReviewInput = {
    text: 'Test review ' + randomstring.generate(7),
    game: 'Testgame',
    author: 'Testauthor',
    score: 5,
  };

  // create first user
  it('should create a new user', async () => {
    await postUser(app, testUser);
  });

  // create second user
  it('should create second user', async () => {
    await postUser(app, testUser2);
  });

  // test login
  it('should login user', async () => {
    const vars = {
      credentials: {
        user_name: testUser.user_name!,
        password: testUser.password!,
      },
    };
    userData = await loginUser(app, vars);
  });

  // test login with second user
  it('should login second user', async () => {
    const vars = {
      credentials: {
        user_name: testUser2.user_name!,
        password: testUser2.password!,
      },
    };
    userData2 = await loginUser(app, vars);
  });

  // test get all users
  it('should return array of users', async () => {
    await getUser(app);
  });

  // test get single user
  it('should return single user', async () => {
    await getSingleUser(app, userData.user.id!);
  });

  // test update user bio
  it('should update user bio', async () => {
    await putUser(app, userData.token!);
  });

  // test post review
  it('should post a review', async () => {
    await postReview(app, testReview1);
  });
});