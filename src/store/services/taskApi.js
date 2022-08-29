// src/services/taskApi.js
import {
  createApi,
  fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import BaseUrl from '../../api/BaseUrl';
export const taskApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseUrl}`,
    prepareHeaders: (headers, { getState, endpoint }) => {
        headers.set('Authorization', "Bearer 4545980ce66bd555d903f7dc739f91e631606eb1")
        return headers
    },
    credentials: 'include', // This allows server to set cookies
  }),
  tagTypes: ["Candidate"],
  endpoints: (builder) => ({
    candidates: builder.query({
      query: () => "/candidate",
      providesTags: ["Candidate"]
    }),
    getCandidates:builder.query({
      query: (id) => ({
        url: `/candidate/${id}`,
        method: "GET",
      }),
    }),
    addCandidates: builder.mutation({
      query: (data) => ({
        url: "/candidate",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["Candidate"]
    }),
    updateCandidates: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/candidate/${id}`,
        method: "PUT",
        body: data
      }),
      invalidatesTags: ["Candidate"]
    }),
    deleteCandidates: builder.mutation({
      query: (id) => ({
        url: `/candidate/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["Candidate"]
    })
  })
});
export const {
 useGetCandidatesQuery,
  useCandidatesQuery,
  useAddCandidatesMutation,

  useDeleteCandidatesMutation,
  useUpdateCandidatesMutation
} = taskApi;