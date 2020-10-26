import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { deleteComment, getCommentsByPage } from '../store/modules/comments';

const Comment = styled.div`
  padding: 7px 10px;
  text-align: left;

  & > img {
    vertical-align: middle;
    margin-right: 10px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
`;

const CreatedAt = styled.div`
  float: right;
  vertical-align: middle;
`;

const Content = styled.div`
  margin: 10px 0;
`;

const Button = styled.div`
  text-align: right;
  margin: 10px 0;
  & > a {
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

function CommentItem({ comment }) {
  const { limit } = useSelector((state) => state.comments);
  const dispatch = useDispatch();
  const { id, profile_url, author, createdAt, content } = comment;

  const onSet = () => {
    dispatch({ type: 'SET_MODIFY_COMMENT', comment });
  };

  const onRemove = () => {
    if (window.confirm('정말 삭제하시겠습니까?') === true) {
      dispatch(deleteComment(id)).then(() =>
        dispatch(getCommentsByPage(1, limit))
      );
    } else {
      return;
    }
  };

  return (
    <Comment key={comment.id}>
      <img src={profile_url} alt="" />

      {author}

      <CreatedAt>{createdAt}</CreatedAt>

      <Content>{content}</Content>

      <Button>
        <a onClick={onSet}>수정</a>
        <a onClick={onRemove}>삭제</a>
      </Button>

      <hr />
    </Comment>
  );
}

export default CommentItem;
