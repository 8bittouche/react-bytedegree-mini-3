import {
  getCommentsThunk,
  addCommentThunk,
  deleteCommentThunk,
  modifyCommentThunk,
  reducerUtils,
  handleAsyncActions,
} from '../../lib/asyncUtils';
import * as commentsAPI from '../../api/comments';

export const initialState = {
  page: '1',
  limit: 5,
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

const SET_MODIFY_COMMENT = 'SET_MODIFY_COMMENT';
const MODIFY_COMMENT = 'MODIFY_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

export const getComments = getCommentsThunk(GET_COMMENTS_ALL, commentsAPI.getComments);
export const getCommentsByPage = getCommentsThunk(GET_COMMENTS_PAGE, commentsAPI.getCommentsByPage);

export const addComment = addCommentThunk(ADD_COMMENT);
export const modifyComment = modifyCommentThunk(MODIFY_COMMENT);
export const deleteComment = deleteCommentThunk(DELETE_COMMENT);

export default function comments(state = initialState, action) {
  const { commentsAll } = state;

  switch (action.type) {
    case GET_COMMENTS_ALL:
    case GET_COMMENTS_ALL_SUCCESS:
    case GET_COMMENTS_ALL_ERROR:
      return handleAsyncActions(GET_COMMENTS_ALL, 'commentsAll', true)(state, action);
    case GET_COMMENTS_PAGE:
    case GET_COMMENTS_PAGE_SUCCESS:
    case GET_COMMENTS_PAGE_ERROR:
      return handleAsyncActions(GET_COMMENTS_PAGE, 'commentsPage', true)(state, action);

    case ADD_COMMENT:
      const addedComment = action.comment;
      addedComment.id =
        commentsAll.comments[commentsAll.comments.length - 1].id + 1;

      return {
        ...state,
        commentsAll: {
          ...commentsAll,
          comments: commentsAll.comments.concat(addedComment),
        },
      };
    case SET_MODIFY_COMMENT:
      return {
        ...state,
        modifyOn: true,
        currentComment: action.comment,
      };
    case MODIFY_COMMENT:
      const modifiedComment = action.comment;
      modifiedComment.id = action.modifiedId;

      return {
        ...state,
        modifyOn: false,
        commentsAll: {
          ...commentsAll,
          comments: commentsAll.comments.map((comment) =>
            comment.id === action.modifiedId ? modifiedComment : comment
          ),
        },
      };
    case DELETE_COMMENT:
      return {
        ...state,
        commentsAll: {
          ...commentsAll,
          comments: commentsAll.comments.filter(
            (comment) => comment.id !== action.removeId
          ),
        },
      };
    default:
      return state;
  }
}
