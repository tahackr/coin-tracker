import { createSlice } from "@reduxjs/toolkit";

const cachedCoinsSlice = createSlice({
    name: "cachedCoins",
    initialState: [],
    reducers: {
        addFetchedCoins(state, action) {
            return action.payload;
        },
    },
});

export const { addFetchedCoins } = cachedCoinsSlice.actions;
export const cachedCoinsReducer = cachedCoinsSlice.reducer;
