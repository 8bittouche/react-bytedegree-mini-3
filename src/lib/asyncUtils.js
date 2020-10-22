import { getComments } from "../api/comments";

export const createCommentsThunk = (type) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`,`${type}_ERROR`];

  return () => async dispatch => {
    dispatch({type});

    try {
      const payload = await getComments();
      dispatch({type: SUCCESS, payload});
    } catch(e) {
      dispatch({type: ERROR, payload: e, error: true});
    }
  }
}