import React, { useState } from "react";
import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import SendIcon from "@mui/icons-material/Send";

function Header() {
    const [adding, setAdding] = useState(false);
    const [value, setValue] = useState("");
    const handleOpenForm = () => {
        setAdding(!adding);
    };

    const handleInputChange = (e) => {
        setValue(e.target.value);
    };

    const handleAddCoin = (e) => {
        e.preventDefault();
        setValue("");
    };

    return (
        <div className="flex justify-between p-2 mb-2 border-b">
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
                <form className="flex items-center border rounded">
                    <input
                        value={value}
                        onChange={(e) => handleInputChange(e)}
                        className="outline-none p-2 rounded"
                        placeholder="Coin Symbol e.g. BTC, ETH"
                    />
                    <button onClick={(e) => handleAddCoin(e)}>
                        <SendIcon className="p-1" />
                    </button>
                </form>
            )}
        </div>
    );
}

export default Header;
