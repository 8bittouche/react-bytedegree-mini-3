import React from 'react';
import styled from 'styled-components';

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

function CommentItem({ comment, onSetForm, onRemove }) {
  const { id, profile_url, author, createdAt, content } = comment;

  return (
    <Comment key={comment.id}>
      <img src={profile_url} alt="" />

      {author}

      <CreatedAt>{createdAt}</CreatedAt>

      <Content>{content}</Content>

      <Button>
        <a onClick={() => onSetForm(comment)}>수정</a>
        <a onClick={() => {if (window.confirm('삭제하시겠습니까?')) onRemove(id)}}>삭제</a>
      </Button>

      <hr />
    </Comment>
  );
}

export default CommentItem;
