import { createCommentsThunk } from '../../lib/asyncUtils';
import * as commentsAPI from '../../api/comments';

export const initialState = {
  page: 1,
  limit: 5,
  commentsAll: {
    loading: false,
    comments: [],
    error: null,
  },
  commentsPage: {
    loading: false,
    comments: [],
    error: null,
  },
};

const GET_COMMENTS_ALL = 'GET_COMMENTS_ALL';
const GET_COMMENTS_ALL_SUCCESS = 'GET_COMMENTS_ALL_SUCCESS';
const GET_COMMENTS_ALL_ERROR = 'GET_COMMENTS_ALL_ERROR';

const GET_COMMENTS_PAGE = 'GET_COMMENTS_PAGE';
const GET_COMMENTS_PAGE_SUCCESS = 'GET_COMMENTS_PAGE_SUCCESS';
const GET_COMMENTS_PAGE_ERROR = 'GET_COMMENTS_PAGE_ERROR';

export const getComments = createCommentsThunk(GET_COMMENTS_ALL, commentsAPI.getComments);
export const getCommentsByPage = createCommentsThunk(GET_COMMENTS_PAGE, commentsAPI.getCommentsByPage);

export default function comments(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS_ALL:
      return {
        ...state,
        commentsAll: { ...state.commentsAll, loading: true },
      };
    case GET_COMMENTS_ALL_SUCCESS:
      return {
        ...state,
        commentsAll: { loading: false, comments: action.payload, error: null },
      };
    case GET_COMMENTS_ALL_ERROR:
      return {
        ...state,
        commentsAll: { loading: false, comments: null, error: action.payload },
      };
    case GET_COMMENTS_PAGE:
      return {
        ...state,
        commentsPage: { ...state.commentsPage, loading: true },
      };
    case GET_COMMENTS_PAGE_SUCCESS:
      return {
        ...state,
        commentsPage: { loading: false, comments: action.payload, error: null },
      };
    case GET_COMMENTS_PAGE_ERROR:
      return {
        ...state,
        commentsPage: { loading: false, comments: null, error: action.payload },
      };
    default:
      return state;
  }
}
