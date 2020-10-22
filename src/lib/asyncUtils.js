export const createCommentsThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`,`${type}_ERROR`];
  return (page, limit) => async dispatch => {
    dispatch({type});

    try {
      const payload = await promiseCreator(page, limit);
      dispatch({type: SUCCESS, payload});
    } catch(e) {
      dispatch({type: ERROR, payload: e, error: true});
    }
  }
}