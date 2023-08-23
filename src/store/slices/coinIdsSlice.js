import { createSlice } from "@reduxjs/toolkit";

const coinIdsSlice = createSlice({
    name: "coinIds",
    initialState: JSON.parse(localStorage.getItem("coins")) || [
        1, 2, 3, 4, 5, 6, 7,
    ],
    reducers: {
        addCoinId(state, action) {
            state.indexOf(action.payload) === -1 && state.push(action.payload);
        },
        removeCoin(state, action) {
            const filteredState = state.filter(
                (coin) => coin !== action.payload
            );

            return filteredState;
        },
    },
});

export const { addCoinId, removeCoin } = coinIdsSlice.actions;
export const coinIdsReducer = coinIdsSlice.reducer;
