// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const HackHostApi = createApi({
    reducerPath: 'HackHostApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => `/v2/user/me`,
        }),
        getHackathons: builder.query({
            query: (username) => ({
                url: `/hackathon`,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserQuery, useGetHackathonsQuery } = HackHostApi;
