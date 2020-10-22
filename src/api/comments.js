import axios from 'axios';

export const getComments = async () => {
  try {
    const res = await axios.get('http://localhost:4000/comments');

    return res.data;
  } catch(e) {
    return new Error('Axios Error');
  }
}