import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getData = async () => {
      try {
        setIsFetching(true);

        const { data, status } = await axios.get(url, {
          cancelToken: source.token,
        });

        if (status === 200) {
          setData(data);
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          // process of canceling timed out requests to avoid performance issues.
          // You can implement any solution for that scenario; console.log is just a placeholder.
          console.log("Cancelled fetch request.");
        } else {
          setError(err);
        }
      } finally {
        setIsFetching(false);
      }
    };

    getData();

    return () => {
      source.cancel();
    };
  }, [url]);

  return { data, isFetching, error };
}

export default useFetch;
