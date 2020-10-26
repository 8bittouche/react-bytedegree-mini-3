import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInputs from '../hooks/useInputs';
import { getCommentsByPage } from '../store/modules/comments';
import { addComment, modifyComment } from '../store/modules/comments';

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

function Form() {
  const { page, limit, modifyOn, currentComment } = useSelector(
    (state) => state.comments
  );
  const dispatch = useDispatch();
  const [inputs, setInputs, onChange] = useInputs();
  const { profile_url, author, content, createdAt } = inputs;

  const onSubmit = (e) => {
    e.preventDefault();

    const comment = {
      profile_url,
      author,
      content,
      createdAt,
    };

    if (modifyOn) {
      dispatch(modifyComment(currentComment.id, comment)).then(() =>
        dispatch(getCommentsByPage(page, limit))
      );
    } else {
      dispatch(addComment(comment)).then(() =>
        dispatch(getCommentsByPage(1, limit))
      );
    }

    setInputs({
      profile_url: '',
      author: '',
      content: '',
      createdAt: '',
    });
  };

  useEffect(() => {
    if (modifyOn) {
      setInputs({
        profile_url: currentComment.profile_url,
        author: currentComment.author,
        content: currentComment.content,
        createdAt: currentComment.createdAt,
      });
    }
  }, [modifyOn, currentComment, setInputs]);

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
