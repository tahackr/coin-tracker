import { useEffect, useState } from "react";
import axios from "axios";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsFetching(true);

                const { data, status } = await axios.get(url, {
                    signal: AbortSignal.timeout(5000),
                });

                if (status === 200) {
                    setData(data);
                }
            } catch (err) {
                if (err.code === "ERR_CANCELED") {
                    setError(new Error("Request took too long"));
                } else {
                    setError(err);
                }
            } finally {
                setIsFetching(false);
            }
        };

        getData();
    }, [url]);

    return { data, isFetching, error };
}

export default useFetch;
