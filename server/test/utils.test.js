import * as PostApi from "../queries/post";
import { docsMap, formatDate } from "../utils";

describe('Date Test 🗓', () => {
  test('Diffrent year', async () => {
    PostApi.findPost = jest.fn().mockResolvedValue([
      {
      writeDate: '2020-08-23T13:08:26.173Z'
      }
    ]);
    const docs = await PostApi.findPost('징검');
    expect(formatDate(docs[0].writeDate)).toBe('2020년 08월 23일 22:08');
  });

  test('Diffrent months and days', async () => {
    PostApi.findPost = jest.fn().mockResolvedValue([
      {
      writeDate: '2021-03-21T13:08:26.173Z'
      }
    ]);
    const docs = await PostApi.findPost('징검');
    expect(formatDate(docs[0].writeDate)).toBe('03월 21일 22:08');
  });

  test('Diffrent days', async () => {
    PostApi.findPost = jest.fn().mockResolvedValue([
      {
      writeDate: '2021-03-25T13:08:26.173Z'
      }
    ]);
    const docs = await PostApi.findPost('징검');
    expect(formatDate(docs[0].writeDate)).toBe('03월 25일 22:08');
  });

  test('Same years and months and days', async () => {
    PostApi.findPost = jest.fn().mockResolvedValue([
      {
      writeDate: '2021-08-30T13:08:26.173Z'
      }
    ]);
    const docs = await PostApi.findPost('징검');
    expect(formatDate(docs[0].writeDate)).toBe('22:08');
  });
});

describe('DocsMap 테스트', () => {
  test('', () => {
    posts = docsMap(posts, (post) => {
      post.writeDate = formatDate(post.writeDate);
      return post;
    });
  });
});