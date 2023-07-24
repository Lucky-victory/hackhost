import { Hackathon } from "@/const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { APIResponse } from "../types";

// Define a service using a base URL and expected endpoints

export const HackHostApi = createApi({
  reducerPath: "HackHostApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Hackathons"],

  endpoints: (builder) => ({
    getHackathons: builder.query<Partial<APIResponse<Hackathon[]>>, void>({
      query: () => ({
        url: `hackathons/`,
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
    getHackathon: builder.query<Partial<APIResponse<Hackathon>>, string>({
      query: (slug) => `hackathon/${slug}`,
      providesTags: (result, error, slug) => {
        return [{ type: "Hackathons" as const, id: slug }];
      },
    }),
    addHackathon: builder.mutation<Partial<Hackathon>, Partial<Hackathon>>({
      query: (data) => ({
        url: `hackathons/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Hackathons" as const, id: "LIST" }],
    }),
    updateHackathon: builder.mutation<Partial<Hackathon>, Partial<Hackathon>>({
      query(data) {
        const { slug, ...body } = data;
        return {
          url: `hackathon/${slug}`,
          method: "PATCH",
          body,
        };
      },

      invalidatesTags: (result, error, { slug }) => [
        { type: "Hackathons", id: slug },
      ],
    }),
    getCSRFToken: builder.query<{ csrfToken: string }, void>({
      query: () => "/auth/csrf",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddHackathonMutation,
  useGetHackathonsQuery,
  useGetHackathonQuery,
  useUpdateHackathonMutation,
  useGetCSRFTokenQuery,
} = HackHostApi;
