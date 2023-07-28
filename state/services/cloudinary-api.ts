// import { Hackathon } from "@/const";
import { envConfigs } from '@/lib/utils';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const CloudinaryApi = createApi({
    reducerPath: 'CloudinaryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://api.cloudinary.com/v1_1/${envConfigs.cloudinary.cloudName}`,
    }),
    tagTypes: ['cloudinary'],

    endpoints: (builder) => ({
        cloudUploadImage: builder.mutation<any, { data: FormData }>({
            query: ({ data }) => ({
                url: `/image/upload`,
                body: data,
                method: 'POST',
            }),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCloudUploadImageMutation } = CloudinaryApi;
