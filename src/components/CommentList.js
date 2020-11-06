import React from 'react';
import CommentItem from './CommentItem';

function CommentList({ comments, onSetForm, onRemove }) {
  return comments.map((comment) => (
    <CommentItem key={comment.id} comment={comment} onSetForm={onSetForm} onRemove={onRemove} />
  ));
}

export default CommentList;
