import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
        reducerPath: "adminApi",
        tagTypes: ["User","Products","Customers","Transactions","Login","Register","Request"],
        endpoints:(build) => ({
            getRequest: build.query({
                query: (id) => `requestsform/requests/${id}`,
                providesTags: ["User"],
            }),
            getProducts: build.query({
                query:() => "client/products",
                providesTags:["Products"],
            }),
            getCustomers: build.query({
                query: () => "client/customers",
                providesTags: ["Customers"],
              }),
            getTransactions: build.query({
                query: ({ page, pageSize, sort, search }) => ({
                  url: "client/transactions",
                  method: "GET",
                  params: { page, pageSize, sort, search },
                }),
                providesTags: ["Transactions"],
              }),
              login: build.mutation({
                query: (values) => ({
                  url: '/login',
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: values,
                }),
                invalidatesTags: ["Login"],
              }),
              register: build.mutation({
                query: (values) => ({
                  url: '/register',
                  method: 'POST',
                  body: values,
                }),
                invalidatesTags: ["Register"]
              }),
              Request: build.mutation({
                query: (values) => ({
                  url: '/request',
                  method: 'POST',
                  body: values,
                }),
                invalidatesTags: ["Request"]
              }),
              
        }),
})

export const { useGetProductsQuery, 
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useLoginMutation,
  useRegisterMutation,
useRequestMutation,
useGetRequestQuery} = api ;