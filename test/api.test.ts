import mongoose from "mongoose";
import { getNotFound } from "./testFunctions";
import app from "../app";
import { LoginResponse } from "../types/MessageTypes";
import { ForumPostInput, LFGInput, LFGTest, ReviewInput, ReviewModify, ReviewTest, UserTest } from "../types/DBTypes";
import randomstring from "randomstring";
import { getSingleUser, getUser, loginUser, postUser, putUser } from "./userFunctions";
import { deleteReview, getReviewsByGame, postReview, putReview } from "./reviewFunctions";
import { deleteLfg, getLfgByGame, postLfg } from "./lfgFunctions";
import { postForumPost } from "./forumPostFunctions";

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

  const testReview2: ReviewInput = {
    text: 'Test review ' + randomstring.generate(7),
    game: 'Testgame',
    author: 'Testauthor',
    score: 5,
  };

  const testLfg1: LFGInput = {
    text: 'Test LFG ' + randomstring.generate(7),
    game: 'Testgame',
    author: 'Testauthor',
  };

  const testForumPost1: ForumPostInput = {
    author: 'Testauthor',
    title: 'Test title ' + randomstring.generate(7),
    text: 'Test text ' + randomstring.generate(7),
    game: 'Testgame',
  };

  const testReviewId: ReviewTest = {
    id: '',
  };

  const testLfgId: LFGTest = {
    id: '',
  };

  const testReviewUpdate: ReviewTest = {
    id: '',
    game: 'Testgame',
    author: 'Testauthor',
    score: 5,
    text: 'Test review ' + randomstring.generate(7),
  };

  // fortnite game id
  const testGameId: string = '65f0eca2001216c537c1e646';


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
    const result = await postReview(app, testReview1);
    testReviewId.id = result.id;
  });

  // test delete review
  it('should delete a review', async () => {
    await deleteReview(app, testReviewId.id as string);
  });

  // test get fortnite reviews
  it('should return reviews for fortnite', async () => {
    await getReviewsByGame(app, testGameId);
  });

  /* THIS TEST IS STILL WORK IN PROGRESS
  it('should update a review', async () => {
    const newReview: ReviewTest = {
      game: 'Testgame',
      author: 'Testauthor',
      score: 5,
      text: 'Test review ' + randomstring.generate(7),
    };
    await putReview(app, testReviewId.id as string);
  }); */

  // test post LFG
  it('should post a new LFG', async () => {
    const result = await postLfg(app, testLfg1);
    testLfgId.id = result.id;
  });

  // test delete LFG
  it('should delete a LFG', async () => {
    await deleteLfg(app, testLfgId.id as string);
  });

  // test get fortnite LFG's
  it('should return LFGs for fortnite', async () => {
    await getLfgByGame(app, testGameId);
  });

  /* Doesnt want to work, says ForumPostInput doesnt have id?
  // test post forum post
  it('should post a new forum post', async () => {
    const result = await postForumPost(app, testForumPost1);
    testForumPost1.id = result.id; 
  }); */
});