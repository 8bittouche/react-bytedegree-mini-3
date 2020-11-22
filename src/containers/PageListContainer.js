import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageList from '../components/PageList';
import { getComments, getCommentsByPage } from '../store/modules/comments';

function PageListContainer() {
  const dispatch = useDispatch();
  const {
    page,
    commentsAll: { comments, loading, error },
  } = useSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getComments());
  }, [dispatch]);

  const getCurrentPage = (page) => {
    dispatch(getCommentsByPage(page));
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;
  if (!comments) return null;

  return <PageList total_cnt={comments.length} page={page} getCurrentPage={getCurrentPage} />;
}

export default PageListContainer;
