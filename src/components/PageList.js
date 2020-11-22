import React from 'react';
import styled from 'styled-components';

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

function PageList({ total_cnt, page, getCurrentPage }) {
  const pageArray = [];
  const pageCnt = Math.ceil(total_cnt / 5);

  for (let i = 1; i <= pageCnt; i++) {
    pageArray.push(
      <Page
        key={i}
        onClick={(e) => getCurrentPage(`${i}`)}
        active={parseInt(page) === i ? true : false}
      >
        {i}
      </Page>
    );
  }

  return <PageListStyle>{pageArray}</PageListStyle>;
}

export default PageList;
