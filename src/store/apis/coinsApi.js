import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const coinsApi = createApi({
    reducerPath: "coins",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://pro-api.coinmarketcap.com",
    }),
    endpoints(builder) {
        return {
            fetchCoins: builder.query({
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
            fetchAllCoins: builder.query({
                query: () => {
                    return {
                        url: "/v1/cryptocurrency/listings/latest",
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

export const { useFetchCoinsQuery, useAddCoinQuery, useFetchAllCoinsQuery } =
    coinsApi;
export { coinsApi };
