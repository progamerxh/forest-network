import * as types from './PostActionType';

export const refreshposts = () => {
  return {
      type: types.POST_REFRESH,
  }
};
export const loadposts = (posts) => {
  return {
      type: types.POST_LOADED,
      posts,
  }
};
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
export const showcomment = (hash) => {
  return {
      type: types.POST_SHOWCOMMENT,
      hash,
  }
};
export const showreact = (hash) => {
  return {
      type: types.POST_SHOWREACT,
      hash,
  }
};