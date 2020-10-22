import { createCommentsThunk } from '../../lib/asyncUtils';

export const initialState = {
  loading: false,
  comments: [],
  error: null,
};

const GET_COMMENTS = 'GET_COMMENTS';
const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
const GET_COMMENTS_ERROR = 'GET_COMMENTS_ERROR';

export const getComments = createCommentsThunk(GET_COMMENTS);

export default function comments(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        loading: true,
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
        error: null,
      };
    case GET_COMMENTS_ERROR:
      return {
        ...state,
        loading: false,
        comments: null,
        error: action.payload,
      };
    default:
      return state;
  }
}
