import axios from 'axios';

export const getComments = async () => {
  const res = await axios.get(`http://localhost:4000/comments`);

  return res.data;
};

export const getCommentsByPage = async (page) => {
  const res = await axios.get(
    `http://localhost:4000/comments?_page=${page}&_limit=5&_order=desc&_sort=id`
  );

  return res.data;
};

export const addComment = async (comment) => {
  await axios.post(`http://localhost:4000/comments`, comment);
};

export const modifyComment = async (id, comment) => {
  await axios.put(`http://localhost:4000/comments/${id}`, comment);
};

export const deleteComment = async (id) => {
  await axios.delete(`http://localhost:4000/comments/${id}`);
};
