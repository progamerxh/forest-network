import * as types from './PostActionType';

export const submitPost = (post) => {
  return {
      type: types.POST_SUBMITED,
      post
  }
};
export const interact = (interact) => {
  return {
      type: types.POST_INTERACT,
      interact
  }
};
export const showcomment = (postid) => {
  return {
      type: types.POST_SHOWCOMMENT,
      postid,
  }
};