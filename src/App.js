import React from "react";
import Table from "./components/Table";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { addFetchedCoins, useFetchAllCoinsQuery } from "./store";

function App() {
    const { data, error } = useFetchAllCoinsQuery();
    const dispatch = useDispatch();

    if (data) {
        dispatch(addFetchedCoins(data.data));
    }

    if (error) {
        return (
            <div className="flex flex-col gap-4 w-[500px] h-96 text-sm font-medium p-4">
                <h1>OOPS! Failed to fetch data from the server.</h1>
                <p>Please reload the extension.</p>
            </div>
        );
    }

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
