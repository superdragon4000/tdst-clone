import { useState } from "react";

const useFetching = (callback:any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        console.log('Unexpected error', e);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error] as const;
};

export default useFetching;