import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { useAddCoinQuery } from "../store";
import { createPortal } from "react-dom";
// Change the imports before release
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { addCoinId } from "../store";

function Header() {
    const dispatch = useDispatch();
    const cachedCoins = useSelector((state) => state.cachedCoins);
    const [adding, setAdding] = useState(false);
    const [value, setValue] = useState("");
    const [skip, setSkip] = useState(true);
    const { data, error, isFetching } = useAddCoinQuery(value.toLowerCase(), {
        skip,
    });

    let renderedCoins = [];
    if (value) {
        const results = cachedCoins.filter((coin) =>
            coin.name.toLowerCase().startsWith(value.toLowerCase())
        );

        for (const [i, coin] of results.entries()) {
            if (i > 9) break;
            renderedCoins.push(
                <li
                    onClick={() => {
                        setValue(coin.slug);
                        setSkip(false);
                    }}
                    className="cursor-pointer p-2 rounded hover:bg-yellow-600"
                    key={i}
                >
                    {coin.name}
                </li>
            );
        }
    }

    const handleOpenForm = () => {
        setAdding(!adding);
    };

    const handleInputChange = (e) => {
        if (e.target.value.match(/^[A-Za-z]+$/) || e.target.value === "") {
            setValue(e.target.value);
        }
    };

    const handleAddCoin = (e) => {
        e.preventDefault();
        if (value) setSkip(false);
    };

    if (data) {
        setAdding(false);
        setSkip(true);
        setValue("");
        for (const coin of Object.values(data.data)) {
            dispatch(addCoinId(coin.id));
        }
    }

    if (error) {
        return createPortal(
            <div className="fixed inset-0 bg-white z-50">
                <h1 className="font-bold text-2xl p-4">
                    OOPS! Something went wrong.
                </h1>
                <p className="flex gap-4 p-4">
                    {error.data.status.error_code}
                    {error.data.status.error_message}
                </p>
            </div>,
            document.body
        );
    }

    return (
        <div className="flex self-stretch justify-between p-2 mb-2 border-b">
            <div className="flex gap-2 items-center">
                <CurrencyBitcoinIcon />

                <p className="font-bold text-yellow-600 cursor-default">
                    COIN TRACKER
                </p>
            </div>
            {!adding ? (
                <button
                    onClick={handleOpenForm}
                    className="p-2 bg-blue-200 rounded bg-yellow-500/80 font-semibold hover:bg-yellow-600 hover:text-white"
                >
                    Add Coin
                </button>
            ) : (
                <div className="relative flex flex-col">
                    <form
                        noValidate
                        className="relative flex items-center border rounded"
                    >
                        <input
                            value={value}
                            type="text"
                            required
                            onChange={(e) => handleInputChange(e)}
                            className="outline-none p-2 rounded"
                            placeholder="Coin Name e.g. Bitcoin"
                        />
                        <button onClick={(e) => handleAddCoin(e)}>
                            {isFetching ? (
                                <CircularProgress size={"1.5rem"} />
                            ) : (
                                <SendIcon className="p-1" />
                            )}
                        </button>
                    </form>
                    <ul className="flex flex-col w-[187px] absolute top-[37px] left-0 bg-listGray z-40 rounded ">
                        {renderedCoins}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Header;
