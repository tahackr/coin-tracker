import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async function () {
      try {
        setIsFetching(true);

        const { data, status } = await axios.get(url);

        if (status === 200) {
          setData(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsFetching(false);
      }
    };

    getData();
  }, [url]);

  return { data, isFetching, error };
}

export default useFetch;
