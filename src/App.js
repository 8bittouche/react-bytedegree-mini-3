import React from 'react';
import CommentListContainer from './containers/CommentListContainer';
import PageListContainer from './containers/PageListContainer';
import FormContainer from './containers/FormContainer';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  width: 1000px;
  border: 1px gray solid;
  border-radius: 10px;
  margin: 0 auto;
`;

function App() {
  return (
    <ContainerWrapper>
      <CommentListContainer />
      <PageListContainer />
      <FormContainer />
    </ContainerWrapper>
  );
}

export default App;
