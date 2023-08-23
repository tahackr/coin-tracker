import React from "react";
import Table from "./components/Table";
import Header from "./components/Header";

function App() {
    return (
        <div className="w-[500px] h-96 overflow-hidden whitespace-nowrap">
            <Header />
            <div className="overflow-y-scroll h-[325px]">
                <Table />
            </div>
        </div>
    );
}

export default App;
