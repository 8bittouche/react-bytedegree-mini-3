import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from '../components/CommentList';
import { getCommentsByPage } from '../store/modules/comments';

function CommentListContainer() {
  const {
    page,
    limit,
    commentsPage: { comments },
  } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCommentsByPage(page, limit));
  }, [dispatch, page, limit]);

  return <CommentList comments={comments} />;
}

export default CommentListContainer;
