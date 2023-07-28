// import { Hackathon } from "@/const";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIResponse } from '../types';
import {
    Hackathon,
    HackathonParticipant,
    HackathonResult,
    Project,
    ProjectCreate,
} from '@/const';

// Define a service using a base URL and expected endpoints

export const HackHostApi = createApi({
    reducerPath: 'HackHostApi',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
    }),
    tagTypes: ['Hackathons'],

    endpoints: (builder) => ({
        getHackathons: builder.query<
            Partial<APIResponse<HackathonResult[]>>,
            {params:{filterBy?:string,limit?:string}}
        >({
            query: ({params}) => {
                console.log(params,'here');
                
                const queryParams = new URLSearchParams(params).toString();
                console.log(queryParams);
                
              return  ({
                url: `hackathons/?${queryParams}`,params
            })},
            providesTags: (result) =>
                // is result available?
                result?.data
                    ? // successful query
                      [
                          ...result?.data.map(({ slug }) => ({
                              type: 'Hackathons' as const,
                              id: slug,
                          })),
                          { type: 'Hackathons', id: 'LIST' },
                      ]
                    : // an error occurred, but we still want to refetch this query when `{ type: 'Hackathons', id: 'LIST' }` is invalidated
                      [{ type: 'Hackathons', id: 'LIST' }],
        }),
        getHackathon: builder.query<
            Partial<APIResponse<HackathonResult>>,
            string
        >({

            query: (slug) => `hackathon/${slug}`,
            providesTags: (result, error, slug) => {
                return [{ type: 'Hackathons' as const, id: slug }];
            },
        }),
        addHackathon: builder.mutation<
            APIResponse<Hackathon>,
            Partial<Hackathon>
        >({
            query: (data) => ({
                url: `hackathons/`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [{ type: 'Hackathons' as const, id: 'LIST' }],
        }),
        addProject: builder.mutation<APIResponse<Project>, ProjectCreate>({
            query: ({ slug, ...rest }) => ({
                url: `hackathon/${slug}/submit`,
                method: 'POST',
                body: { ...rest },
            }),
            invalidatesTags: [{ type: 'Hackathons' as const, id: 'LIST' }],
        }),
        joinHackathon: builder.mutation<
            APIResponse<HackathonParticipant>,
            string
        >({
            query: (slug) => ({
                url: `hackathon/${slug}/join`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Hackathons' as const, id: 'LIST' }],
        }),
        checkHasJoinedHackathon: builder.query<
            APIResponse<{ hasJoined: boolean }>,
            string
        >({
            query: (slug) => ({
                url: `hackathon/${slug}/participants/confirm`,
            }),
        }),
        updateHackathon: builder.mutation<
            APIResponse<Hackathon>,
            Partial<Hackathon>
        >({
            query(data) {
                const { slug, ...body } = data;
                return {
                    url: `hackathon/${slug}`,
                    method: 'PATCH',
                    body,
                };
            },

            invalidatesTags: (result, error, { slug }) => [
                { type: 'Hackathons', id: slug },
            ],
        }),
        getCSRFToken: builder.query<{ csrfToken: string }, void>({
            query: () => '/auth/csrf',
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
    useJoinHackathonMutation,
    useCheckHasJoinedHackathonQuery,
    useAddProjectMutation,
} = HackHostApi;
