import { Hackathon } from '@/const';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIResponse } from '../types';

// Define a service using a base URL and expected endpoints

export const HackHostApi = createApi({
  reducerPath: "HackHostApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/hackathon",
  }),
    tagTypes: ["Hackathons"],
  
  endpoints: (builder) => ({
    getHackathons: builder.query<Partial<APIResponse<Hackathon[]>>, void>({
      query: () => ({
        url: `/`,
      }),
      providesTags: (result) =>
        // is result available?
        result?.data
          ? // successful query
            [
              ...result?.data.map(({ slug }) => ({
                type: "Hackathons" as const,
                id: slug,
              })),
              { type: "Hackathons", id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Hackathons', id: 'LIST' }` is invalidated
            [{ type: "Hackathons", id: "LIST" }],
    }),
    addHackathon: builder.mutation<Partial<Hackathon>, Partial<Hackathon>>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Hackathons" as const, id: "LIST" }],
    }),
    getHackathon: builder.query<Partial<APIResponse<Hackathon>>, string>({
      query: (slug) => `/${slug}`,
      providesTags: (result, error, slug) => [
        { type: "Hackathons" as const, id: slug },
      ],
    }),
    updateHackathon: builder.mutation<Partial<Hackathon>, Partial<Hackathon>>({
      query(data) {
        const { slug, ...body } = data;
        return {
          url: `/${slug}`,
          method: "PATCH",
          body,
        };
      },
     
      invalidatesTags: (result, error, { slug }) => [{ type: "Hackathons", id:slug }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddHackathonMutation, useGetHackathonsQuery,useGetHackathonQuery,useUpdateHackathonMutation } = HackHostApi;
