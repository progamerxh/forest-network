import * as types from './PostActionType';

export const submitPost = (post) => {
  return {
      type: types.POST_SUBMITED,
      post
  }
};