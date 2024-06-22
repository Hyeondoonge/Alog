import { Language } from 'types/api';
import { IPost } from 'types/post';
import { User } from 'types/user';

export function safelyCheckUser(param: any): asserts param is User {
  // generic type guard 고려
  if (typeof param !== 'object' || param === null) {
    throw new Error('failed to checking type of param');
  }
  if (typeof param.userId !== 'string' && param.userId !== null) {
    throw new Error('failed to checking type of userId');
  }
  if (typeof param.profile_fileName !== 'string' && param.profile_fileName !== null) {
    throw new Error('failed to checking type of profile_fileName');
  }
  if (typeof param.api_accessToken !== 'string' && param.api_accessToken !== null) {
    throw new Error('failed to checking type of api_accessToken');
  }
  if (typeof param.api_refreshToken !== 'string' && param.api_refreshToken !== null) {
    throw new Error('failed to checking type of api_refreshToken');
  }
  if (typeof param.accessToken !== 'string' && param.accessToken !== null) {
    throw new Error('failed to checking type of accessToken');
  }
  if (typeof param.refreshToken !== 'string' && param.refreshToken !== null) {
    throw new Error('failed to checking type of refreshToken');
  }
}

export function safelyCheckPosts(
  param: any
): asserts param is { posts: IPost[]; totalCount: number; leftCount: number } {
  // generic type guard 고려
  if (typeof param !== 'object' || param === null) {
    throw new Error('failed to checking type of param');
  }
  if (typeof param.totalCount !== 'number') {
    throw new Error('failed to checking type of profile_fileName');
  }
  if (typeof param.leftCount !== 'number') {
    throw new Error('failed to checking type of api_accessToken');
  }

  // posts 검사
  if (!Array.isArray(param.posts)) {
    throw new Error('failed to checking type of posts');
  }
  if (1 <= param.posts.length) {
    const post = param.posts[0];
    if (typeof post._id !== 'string') {
      throw new Error('failed to checking type of _id');
    }
    if (typeof post.title !== 'string') {
      throw new Error('failed to checking type of title');
    }

    if (typeof post.subtitle !== 'undefined' && typeof post.subtitle !== 'string') {
      throw new Error('failed to checking type of subtitle');
    }
    if (typeof post.language !== 'undefined' && typeof post.language !== 'string') {
      throw new Error('failed to checking type of language');
    }
    console.log(post);

    if (typeof post.writerId !== 'string') {
      throw new Error('failed to checking type of writerId');
    }
    if (typeof post.writeDate !== 'string') {
      throw new Error('failed to checking type of writeDate');
    }
    if (typeof post.likeCount !== 'number') {
      throw new Error('failed to checking type of likeCount');
    }
  }
}

export function safelyCheckLanguages(param: any): asserts param is { languages: Language[] } {
  if (typeof param !== 'object' || param === null) {
    throw new Error('failed to checking type of param');
  }
  if (!Array.isArray(param.languages)) {
    throw new Error('failed to checking type of languages');
  }
  if (1 <= param.languages.length) {
    const language = param.languages[0];
    if (typeof language._id !== 'string') {
      throw new Error('failed to checking type of id');
    }
    if (typeof language.name !== 'string') {
      throw new Error('failed to checking type of name');
    }
  }
}

export function safelyCheckLoginUrl(param: any): asserts param is { url: string } {
  if (typeof param !== 'object' || param === null) {
    throw new Error('failed to checking type of param');
  }
  if (typeof param.url !== 'string') {
    throw new Error('failed to checking type of url');
  }
}

export function safelyCheckRefreshToken(param: any): asserts param is { access_token: string } {
  if (typeof param !== 'object' || param === null) {
    throw new Error('failed to checking type of param');
  }
  if (typeof param.access_token !== 'string') {
    throw new Error('failed to checking type of access token');
  }
}

export function safelyCheckLogoutInfo(param: any): asserts param is { id: number } {
  if (typeof param !== 'object' || param === null) {
    throw new Error('failed to checking type of param');
  }
  if (typeof param.id !== 'number') {
    throw new Error('failed to checking type of id');
  }
}
