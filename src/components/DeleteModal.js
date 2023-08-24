import React from "react";
import { createPortal } from "react-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { removeCoin } from "../store";
import CloseIcon from "@mui/icons-material/Close";

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
            <div className="absolute flex flex-col justify-between inset-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-56 h-40 p-4 rounded-md shadow-xl">
                <div className="flex justify-between gap-4 items-start">
                    <div className="pr-4">{`Are you sure you want to delete "${coin.name}"?`}</div>
                    <CloseIcon
                        ref={cancelButtonRef}
                        className="!h-4 !w-4 translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    />
                </div>

                <button
                    onClick={handleDelete}
                    className="p-2 bg-red-600 rounded text-white self-end"
                >
                    Delete
                </button>
            </div>
        </div>,
        document.body
    );
}

export default ControlDelete;
