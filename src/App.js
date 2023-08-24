import React, { useEffect } from "react";
import Table from "./components/Table";
import Header from "./components/Header";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addFetchedCoins } from "./store";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCachedCoins = async function () {
            const cachedCoins = await axios.get(
                "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
                {
                    cache: "force-cache",
                    headers: {
                        "X-CMC_PRO_API_KEY":
                            "ab0cf1ed-2b3d-488f-b84e-515d554e6d8a",
                    },
                }
            );
            dispatch(addFetchedCoins(cachedCoins.data.data));
        };
        fetchCachedCoins();
    });
    return (
        <div className="w-[500px] h-96 overflow-hidden whitespace-nowrap select-none">
            <Header />
            <div className="overflow-y-scroll h-[325px]">
                <Table />
            </div>
        </div>
    );
}

export default App;
