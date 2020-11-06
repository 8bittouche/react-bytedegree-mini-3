import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../components/CommentList';
import { deleteComment, getCommentsByPage } from '../store/modules/comments';

function CommentListContainer() {
  const {
    page,
    commentsPage: { comments },
  } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsByPage(page));
  }, [dispatch, page]);

  const onSetForm = (comment) => {
    dispatch({ type: 'MODIFY_ON_COMMENT', comment });
  };

  const onRemove = (id) => {
    dispatch(deleteComment(id)).then(() =>
      dispatch({ type: 'SET_PAGE', page: 1 })
    );
  };

  return (
    <CommentList
      comments={comments}
      onSetForm={onSetForm}
      onRemove={onRemove}
    />
  );
}

export default CommentListContainer;
