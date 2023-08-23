import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { coinsApi } from "./apis/coinsApi";
import { coinIdsReducer } from "./slices/coinIdsSlice";

const store = configureStore({
    reducer: {
        coinIds: coinIdsReducer,
        [coinsApi.reducerPath]: coinsApi.reducer,
    },
});

setupListeners(store.dispatch);

export { useFetchCoinsQuery, useAddCoinQuery } from "./apis/coinsApi";
export { addCoinId, removeCoin } from "./slices/coinIdsSlice";

export { store };
