import axios from 'axios';

export const getComments = async () => {
  try {
    const res = await axios.get(`http://localhost:4000/comments`);

    return res.data;
  } catch (e) {
    return new Error('Axios Error');
  }
};

export const getCommentsByPage = async (page, limit) => {
  try {
    const res = await axios.get(
      `http://localhost:4000/comments?_page=${page}&_limit=${limit}`
    );

    return res.data;
  } catch (e) {
    return new Error('Axios Error');
  }
};
