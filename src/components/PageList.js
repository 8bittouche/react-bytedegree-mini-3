import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCommentsByPage } from '../store/modules/comments';

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Page = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  ${({ active }) =>
    active &&
    `
        background: gray;
        color: #fff;
  `}
  margin-right: 3px;
`;

function PageList() {
  const {
    limit,
    commentsAll: { comments },
  } = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const pageArray = [];
  const pageCnt =
    comments.length % limit === 0
      ? comments.length / limit
      : comments.length / limit + 1;

  const onClick = (e) => {
    const page = e.target.innerText;
    dispatch(getCommentsByPage(page, limit));
  };

  for (let i = 1; i <= pageCnt; i++) {
    pageArray.push(
      <Page key={i} onClick={onClick}>
        {i}
      </Page>
    );
  }

  return <PageListStyle>{pageArray}</PageListStyle>;
}

export default PageList;
