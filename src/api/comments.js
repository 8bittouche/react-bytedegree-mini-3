import axios from 'axios';

export const getComments = async () => {
  try {
    const res = await axios.get(`http://localhost:4000/comments`);

    return res.data;
  } catch (e) {
    return new Error('Axios Error (GET COMMENTS)');
  }
};

export const getCommentsByPage = async (page, limit) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/comments?_page=${page}&_limit=${limit}&_order=desc&_sort=id`
    );

    return res.data;
  } catch (e) {
    return new Error('Axios Error (GET COMMENTS BY PAGE)');
  }
};

export const addComment = async (comment) => {
  try {
    await axios.post(`http://localhost:4000/comments`, comment);
  } catch (e) {
    return new Error('Axios Error (ADD COMMENT)');
  }
};

export const modifyComment = async (id, comment) => {
  try {
    await axios.put(`http://localhost:4000/comments/${id}`, comment);
  } catch (e) {
    return new Error('Axios Error (MODIFY COMMENT)');
  }
};

export const deleteComment = async (id) => {
  try {
    await axios.delete(`http://localhost:4000/comments/${id}`);
  } catch (e) {
    return new Error('Axios Error (DELETE COMMENT)');
  }
};
