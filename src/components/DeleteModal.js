import React from "react";
import { createPortal } from "react-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { removeCoin } from "../store";

function ControlDelete({ coin, setIsModalOpen }) {
    const dispatch = useDispatch();
    const backgroundRef = useRef();
    const cancelButtonRef = useRef();
    const handleClose = (e) => {
        if (
            e.target === backgroundRef.current ||
            e.target === cancelButtonRef.current
        )
            setIsModalOpen(false);
    };

    const handleDelete = () => {
        dispatch(removeCoin(coin.id));
        setIsModalOpen(false);
    };

    return createPortal(
        <div
            ref={backgroundRef}
            className="fixed inset-0 bg-black/30 z-50 text-sm font-medium"
            onClick={handleClose}
        >
            <div className="absolute flex flex-col justify-between inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-72 h-48 p-6 rounded-md shadow-xl">
                <div>{`Are you sure you want to delete "${coin.name}"?`}</div>
                <div className="flex gap-2 self-end">
                    <button
                        ref={cancelButtonRef}
                        className="p-2 bg-gray-400/20 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-2 bg-red-600 rounded text-white"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default ControlDelete;
