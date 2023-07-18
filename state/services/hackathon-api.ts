import { Hackathon } from '@/const';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints

export const HackHostApi = createApi({
    reducerPath: 'HackHostApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/hackathon',
    }),
    endpoints: (builder) => ({
        getHackathons: builder.query<Partial<Hackathon>, void>({
            query: () => ({
                url: `/`,
            }),
        }),
        addHackathon: builder.mutation<Partial<Hackathon>, Partial<Hackathon>>({
            query: (data) => ({
                url: `/`,
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddHackathonMutation, useGetHackathonsQuery } = HackHostApi;
