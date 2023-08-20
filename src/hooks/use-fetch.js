import * as React from "react";
import axios from "axios";

function useFetch(url) {
    const [coins, setCoins] = React.useState(null);
    console.log(url);

    (async function () {
        try {
            const data = await axios.get(url, {
                headers: {
                    "X-CMC_PRO_API_KEY": "ab0cf1ed-2b3d-488f-b84e-515d554e6d8a",
                },
            });
            console.log(data);
            setCoins(data);
        } catch (err) {
            console.error(err.message);
        }
    })();

    return coins;
}

export default useFetch;
