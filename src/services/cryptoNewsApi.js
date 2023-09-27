import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// get headers
const cryptoNewsHeaders = {
  "X-BingApis-SDK": "true",
  "X-RapidAPI-Key": "ec102a9912mshdc0c6f639ee7c55p1fdd24jsn29a0d34477fd",
  "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptoNewsHeaders,
});

export const cryptoNewsApi = createApi({
  // This field specifies the slice name under which the data fetched by this API service will be stored in the Redux store
  //  It will be accessible as state.cryptoNewsApi within your Redux store.
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=OFF&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;