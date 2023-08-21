import React from "react";
import Table from "./components/Table";
import Header from "./components/Header";

function App() {
    return (
        <div className="flex flex-col w-96 h-96 overflow-hidden whitespace-nowrap">
            <Header />
            <Table />
        </div>
    );
}

export default App;
