import request from 'supertest';
import {Application} from 'express';
import { ForumPostTest } from '@/types/DBTypes';

const postForumPost = (
  url: string | Application,
  forumPost: ForumPostTest,
): Promise<ForumPostTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Mutation($input: ForumPostInput) {
            createForumPost(input: $input) {
            id
            author
            title
            text
            game
            }
        }`,
        variables: {
          input: forumPost,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const forumPostData = response.body.data.createForumPost;
          expect(forumPostData.author).toBe(forumPost.author);
          expect(forumPostData.title).toBe(forumPost.title);
          expect(forumPostData.text).toBe(forumPost.text);
          expect(forumPostData.game).toBe(forumPost.game);
          resolve(response.body.data.createForumPost);
        }
      });
  });
};

const deleteForumPost = (
  url: string | Application,
  id: string,
): Promise<ForumPostTest> => {
  return new Promise((resolve, reject) => {
    request(url)
      .post('/graphql')
      .set('Content-type', 'application/json')
      .send({
        query: `mutation Mutation($deleteForumPostId: ID!) {
        deleteForumPost(id: $deleteForumPostId) {
            id
            title
            text
            game
            author
            }
        }`,
        variables: {
          deleteForumPostId: id,
        },
      })
      .expect(200, (err, response) => {
        if (err) {
          reject(err);
        } else {
          const deletedForumPost = response.body.data.deleteForumPost;
          expect(deletedForumPost.id).toBe(id);
          resolve(deletedForumPost);
        }
      });
  });
};

export {
    postForumPost,
    deleteForumPost,
};