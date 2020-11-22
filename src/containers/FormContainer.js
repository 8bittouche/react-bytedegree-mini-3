import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../components/Form';
import useInputs from '../hooks/useInputs';
import {
  addComment,
  getCommentsByPage,
  modifyComment,
} from '../store/modules/comments';

function FormContainer() {
  const { page, modifyOn, currentComment } = useSelector(
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
        dispatch(getCommentsByPage(page))
      );
    } else {
      dispatch(addComment(comment)).then(() =>
        dispatch({ type: 'SET_PAGE', page: 1 })
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
    <Form
      currentComment={currentComment}
      modifyOn={modifyOn}
      inputs={inputs}
      setInputs={setInputs}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
}

export default FormContainer;
