import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const jsonAPI = createApi({
    reducerPath: 'jsonAPI',
    // синтаксис с tagTypes, provideTags, invalidateTags нужен вот в каком случае
    // допустим, что getComments - возвращает все комментарии, например  их 10 штук и они отображены на сайте
    // после создания 11 комментария функцией createComment он не будет автоматически отображен на сайте
    // синтаксис с tagTypes, provideTags, invalidateTags гарантирует, что после создания нового комментария,
    // будет снова сделан запрос за всеми комментариями
    tagTypes: ['Comments'],
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    // query для get запросов
    // mutation для post, put, patch, delete запросов
    endpoints: (build) => ({
        getPosts: build.query({
            query: (id) => `posts/${id}`
        }),
        getComments: build.query({
            query: (id) => `comments/${id}`,
            providesTags: (result) =>
                result
                ? [
                    ...result.map(({ id }) => ({ type: 'Comments', id })),
                    { type: 'Comments', id: 'LIST' },
                    ]
                : [{ type: 'Comments', id: 'LIST' }],
        }),
        createComment: build.mutation({
            query: (data) => ({
                url: 'comments',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }),
            invalidatesTags: [{ type: 'Comments', id: 'LIST' }],
        })
    }), 
})

export const {useGetPostsQuery, useGetCommentsQuery, useCreateCommentMutation} = jsonAPI 