import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../api";

export const apiSlice = createApi({
    reducerPath: "api",

    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),

    tagTypes: ["User", "Subject"],

    endpoints: (builder) => ({
        // Fetch subjects belonging to a specific user.
        getSubjects: builder.query({
            query: (userId) => `/subjects?userId=${userId}`,
            providesTags: ["Subject"],
        }),

        // Fetch a user by email for login.
        getUserByEmail: builder.query({
            query: (email) => `/users?email=${encodeURIComponent(email)}`,
            providesTags: ["User"],
        }),

        // Add a new subject.
        addSubject: builder.mutation({
            query: (newSubject) => ({
                url: "/subjects",
                method: "POST",
                body: newSubject,
            }),
            invalidatesTags: ["Subject"],
        }),

        // Update an existing subject.
        updateSubject: builder.mutation({
            query: ({ id, ...updatedSubject }) => ({
                url: `/subjects/${id}`,
                method: "PUT",
                body: updatedSubject,
            }),
            invalidatesTags: ["Subject"],
        }),

        // Delete a subject.
        deleteSubject: builder.mutation({
            query: (id) => ({
                url: `/subjects/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Subject"],
        }),


        // Check whether an email is already registered.
        checkEmail: builder.query({
            query: (email) => `/users?email=${encodeURIComponent(email)}`,
            providesTags: ["User"],
        }),

        // Register a new user.
        registerUser: builder.mutation({
            query: (newUser) => ({
                url: "/users",
                method: "POST",
                body: newUser,
            }),
            invalidatesTags: ["User"],
        }),


        // Update the user's profile.
        updateUser: builder.mutation({
            query: ({ id, ...updatedUser }) => ({
                url: `/users/${id}`,
                method: "PUT",
                body: updatedUser,
            }),
            invalidatesTags: ["User"],
        }),


    }),
});

export const {
    useGetSubjectsQuery,
    useAddSubjectMutation,
    useUpdateSubjectMutation,
    useDeleteSubjectMutation,
    useLazyGetUserByEmailQuery,
    useLazyCheckEmailQuery,
    useRegisterUserMutation,
    useUpdateUserMutation,
} = apiSlice;

export default apiSlice;