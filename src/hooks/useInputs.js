import { useCallback, useState } from 'react';

export default function useInputs() {
  const [inputs, setInputs] = useState({
    profile_url: '',
    author: '',
    content: '',
    createdAt: '',
  });

  const onChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  return [inputs, setInputs, onChange];
}
