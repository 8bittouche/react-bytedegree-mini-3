import { addComment, deleteComment, modifyComment } from '../api/comments';

export const getCommentsThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (page) => async (dispatch) => {
    dispatch({ type });

    try {
      const payload = await promiseCreator(page);
      dispatch({ type: SUCCESS, payload, page });
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true });
      return new Error('Axios Error (GET COMMENTS)');
    }
  };
};

export const addCommentThunk = () => {
  return (comment) => async () => {
    try {
      await addComment(comment);
    } catch (e) {
      return new Error('Axios Error (ADD COMMENT)');
    }
  };
};

export const modifyCommentThunk = (type) => {
  return (id, comment) => async (dispatch) => {
    try {
      await modifyComment(id, comment);
      dispatch({ type });
    } catch (e) {
      return new Error('Axios Error (MODIFY COMMENT)');
    }
  };
};

export const deleteCommentThunk = () => {
  return (id) => async () => {
    try {
      await deleteComment(id);
    } catch (e) {
      return new Error('Axios Error (DELETE COMMENT)');
    }
  };
};

export const reducerUtils = {
  initialComment: () => ({
    id: '0',
    profile_url: '',
    author: '',
    content: '',
    createdAt: '',
  }),

  initial: (initialData = []) => ({
    loading: false,
    comments: initialData,
    error: null,
  }),

  loading: (prevState = []) => ({
    loading: true,
    comments: prevState,
    error: null,
  }),

  success: (payload) => ({
    loading: false,
    comments: payload,
    error: null,
  }),

  error: (error) => ({
    loading: false,
    comments: null,
    error: error,
  }),
};

export const handleAsyncActions = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].comments : []),
        };
      case SUCCESS:
        return {
          ...state,
          page: action.page ? action.page : state.page,
          [key]: reducerUtils.success(action.payload),
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload),
        };
      default:
        return state;
    }
  };
};
