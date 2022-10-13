import { useState } from 'react';
const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
      setIsSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, isSuccess, setIsSuccess];
};

export default useFetching;
