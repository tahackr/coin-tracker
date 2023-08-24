import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { coinsApi } from "./apis/coinsApi";
import { coinIdsReducer } from "./slices/coinIdsSlice";
import { cachedCoinsReducer } from "./slices/cachedCoinsSlice.js";

const store = configureStore({
    reducer: {
        coinIds: coinIdsReducer,
        cachedCoins: cachedCoinsReducer,
        [coinsApi.reducerPath]: coinsApi.reducer,
    },
});

setupListeners(store.dispatch);

export {
    useFetchCoinsQuery,
    useAddCoinQuery,
    useFetchAllCoinsQuery,
} from "./apis/coinsApi";
export { addCoinId, removeCoin } from "./slices/coinIdsSlice";
export { addFetchedCoins } from "./slices/cachedCoinsSlice";

export { store };
