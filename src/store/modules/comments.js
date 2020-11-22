import {
  getCommentsThunk,
  deleteCommentThunk,
  reducerUtils,
  handleAsyncActions,
  addCommentThunk,
  modifyCommentThunk,
} from '../../lib/asyncUtils';
import * as commentsAPI from '../../api/comments';

export const initialState = {
  page: '1',
  modifyOn: false,
  commentsAll: reducerUtils.initial(),
  commentsPage: reducerUtils.initial(),
  currentComment: reducerUtils.initialComment(),
};

const GET_COMMENTS_ALL = 'GET_COMMENTS_ALL';
const GET_COMMENTS_ALL_SUCCESS = 'GET_COMMENTS_ALL_SUCCESS';
const GET_COMMENTS_ALL_ERROR = 'GET_COMMENTS_ALL_ERROR';

const GET_COMMENTS_PAGE = 'GET_COMMENTS_PAGE';
const GET_COMMENTS_PAGE_SUCCESS = 'GET_COMMENTS_PAGE_SUCCESS';
const GET_COMMENTS_PAGE_ERROR = 'GET_COMMENTS_PAGE_ERROR';

const MODIFY_ON_COMMENT = 'MODIFY_ON_COMMENT';
const MODIFY_OFF_COMMENT = 'MODIFY_OFF_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const SET_PAGE = 'SET_PAGE';

export const getComments = getCommentsThunk(
  GET_COMMENTS_ALL,
  commentsAPI.getComments
);
export const getCommentsByPage = getCommentsThunk(
  GET_COMMENTS_PAGE,
  commentsAPI.getCommentsByPage
);
export const addComment = addCommentThunk();
export const modifyComment = modifyCommentThunk(MODIFY_OFF_COMMENT);
export const deleteComment = deleteCommentThunk(DELETE_COMMENT);

export default function comments(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS_ALL:
    case GET_COMMENTS_ALL_SUCCESS:
    case GET_COMMENTS_ALL_ERROR:
      return handleAsyncActions(
        GET_COMMENTS_ALL,
        'commentsAll',
        true
      )(state, action);
    case GET_COMMENTS_PAGE:
    case GET_COMMENTS_PAGE_SUCCESS:
    case GET_COMMENTS_PAGE_ERROR:
      return handleAsyncActions(
        GET_COMMENTS_PAGE,
        'commentsPage',
        true
      )(state, action);

    case MODIFY_ON_COMMENT:
      return {
        ...state,
        modifyOn: true,
        currentComment: action.comment,
      };
    case MODIFY_OFF_COMMENT:
      return {
        ...state,
        modifyOn: false,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      }
    default:
      return state;
  }
}
