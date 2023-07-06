// this is a api created to fetch api data
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "ec102a9912mshdc0c6f639ee7c55p1fdd24jsn29a0d34477fd",
};


const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url)=>({
    url,headers: cryptoApiHeaders
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    // for crypto details
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    // for coin history creating
    getCryptoHistory: builder.query({
      // query: ({coinId,timePeriod}) => createRequest(`/coin/${coinId}/history?timeperiod=${timePeriod}`),
      query: ({ coinId, timePeriod }) =>
        createRequest(
          `/coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`
        ),
    }),
  }),
});

// created by redux to use data
export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery
} = cryptoApi;