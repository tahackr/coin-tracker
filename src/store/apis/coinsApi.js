import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const coinsApi = createApi({
    reducerPath: "coins",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://pro-api.coinmarketcap.com",
    }),
    endpoints(builder) {
        return {
            fetchCoins: builder.query({
                /* providesTags: (result) => {
                    const tags = [];
                    for (const coin of Object.values(result?.data)) {
                        tags.push({ type: "Coins", id: coin.id });
                    }
                    return tags;
                }, */
                query: (coins) => {
                    const queryString = coins.join(",");
                    return {
                        url: `/v2/cryptocurrency/quotes/latest?id=${queryString}`,
                        headers: {
                            "X-CMC_PRO_API_KEY":
                                "ab0cf1ed-2b3d-488f-b84e-515d554e6d8a",
                        },
                    };
                },
            }),
            addCoin: builder.query({
                /* providesTags: (result) => {
                    const tags = [];
                    for (const coin of Object.values(result.data)) {
                        tags.push({ type: "Coins", id: coin.id });
                    }
                    return tags;
                }, */
                query: (coinSlug) => {
                    return {
                        url: `/v2/cryptocurrency/quotes/latest?slug=${coinSlug}`,
                        headers: {
                            "X-CMC_PRO_API_KEY":
                                "ab0cf1ed-2b3d-488f-b84e-515d554e6d8a",
                        },
                    };
                },
            }),
        };
    },
});

export const { useFetchCoinsQuery, useAddCoinQuery } = coinsApi;
export { coinsApi };
