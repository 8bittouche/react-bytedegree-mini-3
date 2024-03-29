import React from 'react';
import styled from 'styled-components';

const FormStyle = styled.div`
  & > form {
    padding: 0 10px;
    margin-bottom: 50px;
  }

  & > form > textarea {
    padding: 5px 1%;
    width: 98%;
    height: 50px;
  }

  & > form > input[type='text'] {
    padding: 5px 1%;
    width: 98%;
    margin-bottom: 10px;
  }

  & > form > button {
    padding: 0.375rem 0.75rem;
    border-radius: 0.25rem;
    border: 1px solid lightgray;
    cursor: pointer;
  }
`;

function Form({ inputs, onChange, onSubmit }) {
  const { profile_url, author, content, createdAt } = inputs;

  return (
    <FormStyle>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="profile_url"
          value={profile_url}
          placeholder="https://picsum.photos/id/1/50/50"
          onChange={onChange}
          required
        />
        <br />
        <input
          type="text"
          name="author"
          value={author}
          placeholder="작성자"
          onChange={onChange}
        />
        <br />
        <textarea
          name="content"
          value={content}
          placeholder="내용"
          onChange={onChange}
          required
        ></textarea>
        <br />
        <input
          type="text"
          name="createdAt"
          value={createdAt}
          placeholder="2020-05-30"
          onChange={onChange}
          required
        />
        <br />
        <button type="submit">등록</button>
      </form>
    </FormStyle>
  );
}

export default Form;
