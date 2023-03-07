// src/services/taskApi.js
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import BaseUrl from '../../api/BaseUrl';
export const taskApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BaseUrl}`,
    prepareHeaders: (headers, {getState, endpoint}) => {
      headers.set(
        'Authorization',
        'Bearer 4545980ce66bd555d903f7dc739f91e631606eb1',
      );
      return headers;
    },
    credentials: 'include', // This allows server to set cookies
  }),
  tagTypes: [
    'Candidate',
    'Reference',
    'Referrals',
    'Education',
    'Certificate',
    'Experience',
  ],
  endpoints: builder => ({
    // candidate
    candidates: builder.query({
      query: () => '/candidate',
      providesTags: ['Candidate', 'Education'],
    }),
    getCandidates: builder.query({
      query: id => ({
        url: `/candidate/${id}`,
        method: 'GET',
      }),
      providesTags: ['Candidate', 'Education'],
    }),
    addCandidates: builder.mutation({
      query: data => ({
        url: '/candidate',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Candidate'],
    }),
    updateCandidates: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/candidate/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Candidate'],
    }),
    deleteCandidates: builder.mutation({
      query: id => ({
        url: `/candidate/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Candidate'],
    }),

    // Reference
    reference: builder.query({
      query: () => '/reference',
      providesTags: ['Reference'],
    }),
    getReference: builder.query({
      query: id => ({
        url: `/reference/${id}`,
        method: 'GET',
      }),
      providesTags: ['Reference'],
    }),
    addReference: builder.mutation({
      query: data => ({
        url: '/reference',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Reference'],
    }),
    updateReference: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/reference/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Reference'],
    }),
    deleteReference: builder.mutation({
      query: id => ({
        url: `/reference/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Reference'],
    }),

    //  Refrellas
    referrals: builder.query({
      query: () => '/referrals',
      providesTags: ['Referrals'],
    }),
    getReferrals: builder.query({
      query: id => ({
        url: `/referrals/${id}`,
        method: 'GET',
      }),
      providesTags: ['Referrals'],
    }),
    addReferrals: builder.mutation({
      query: data => ({
        url: '/referrals',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Referrals'],
    }),
    updateReferrals: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/referrals/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Referrals'],
    }),
    deleteReferrals: builder.mutation({
      query: id => ({
        url: `/referrals/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Referrals'],
    }),

    // Education
    education: builder.query({
      query: () => '/education',
      providesTags: ['Candidate', 'Education'],
    }),
    getEducation: builder.query({
      query: id => ({
        url: `/education/${id}`,
        method: 'GET',
      }),
      providesTags: ['Candidate'],
    }),
    addEducation: builder.mutation({
      query: data => ({
        url: '/education',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Candidate'],
    }),
    updateEducation: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/education/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Candidate'],
    }),
    deleteEducation: builder.mutation({
      query: id => ({
        url: `/education/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Candidate'],
    }),

    // Experience

    experience: builder.query({
      query: () => '/experience',
      providesTags: ['Experience'],
    }),
    getExperience: builder.query({
      query: id => ({
        url: `/experience/${id}`,
        method: 'GET',
      }),
      providesTags: ['Experience'],
    }),
    addExperience: builder.mutation({
      query: data => ({
        url: '/experience',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Experience'],
    }),
    updateExperience: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/experience/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Experience'],
    }),
    deleteExperience: builder.mutation({
      query: id => ({
        url: `/experience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Experience'],
    }),

    // Certificate

    certificate: builder.query({
      query: () => '/certificate',
      providesTags: ['Certificate'],
    }),
    getCertificate: builder.query({
      query: id => ({
        url: `/certificate/${id}`,
        method: 'GET',
      }),
      providesTags: ['Certificate'],
    }),
    addCertificate: builder.mutation({
      query: data => ({
        url: '/certificate',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Certificate'],
    }),
    updateCertificate: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/certificate/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Certificate'],
    }),
    deleteCertificate: builder.mutation({
      query: id => ({
        url: `/certificate/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Certificate'],
    }),
  }),
});

export const {
  useGetCandidatesQuery,
  useCandidatesQuery,
  useAddCandidatesMutation,
  useDeleteCandidatesMutation,
  useUpdateCandidatesMutation,
  useAddReferenceMutation,
  useDeleteReferenceMutation,
  useReferenceQuery,
  useGetReferenceQuery,
  useUpdateReferenceMutation,
  useGetReferralsQuery,
  useDeleteReferralsMutation,
  useAddCertificateMutation,
  useDeleteCertificateMutation,
  useCertificateQuery,
  useGetCertificateQuery,
  useUpdateCertificateMutation,
  useAddEducationMutation,
  useDeleteEducationMutation,
  useEducationQuery,
  useGetEducationQuery,
  useUpdateEducationMutation,
  useAddExperienceMutation,
  useDeleteExperienceMutation,
  useExperienceQuery,
  useGetExperienceQuery,
  useUpdateExperienceMutation,
} = taskApi;
