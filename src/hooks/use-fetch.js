import { useEffect, useState } from "react";
import axios from "axios";
//import "dotenv/config";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async function () {
            try {
                setIsFetching(true);
                /* const data = await axios.get(url, {
                    headers: {
                        "X-CMC_PRO_API_KEY":
                            "ab0cf1ed-2b3d-488f-b84e-515d554e6d8a",
                    },
                }); */

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
