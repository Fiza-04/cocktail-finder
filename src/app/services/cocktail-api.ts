import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cocktailApi = createApi({
    reducerPath: 'cocktailApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.thecocktaildb.com/api/json/v1/1/' }),
    endpoints: (builder) => ({
      getCocktailByName: builder.query({
        query: (name: string) => `search.php?s=${name}`,
      }),

      getCocktailByFirstLetter: builder.query({
        query: (letter: string) => `search.php?f=${letter}`,
      }),

    }),
  })
  
export const { 
    useGetCocktailByNameQuery, 
    useGetCocktailByFirstLetterQuery, 
  } = cocktailApi