import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Drink {
  idDrink: string
  [key: string]: any
}

interface FavoritesState {
  items: Drink[]
}

// Load favorite drinks from localStorage
const loadFromLocalStorage = (): Drink[] => {
  const stored = localStorage.getItem('favoriteCocktails')
  return stored ? JSON.parse(stored) : []
}

// save current favorites to localStorage
const saveToLocalStorage = (items: any[]) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(items))
  } catch (e) {}
}

const initialState: FavoritesState = {
  items: loadFromLocalStorage(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<any>) => {
      const exists = state.items.some(item => item.idDrink === action.payload.idDrink)
      // if already exist in storage remove, else add
      state.items = exists
        ? state.items.filter(item => item.idDrink !== action.payload.idDrink)
        : [...state.items, action.payload]

      saveToLocalStorage(state.items)
    },
    clearFavorites: (state) => {
      state.items = []
      saveToLocalStorage([])
    },
  },
})

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
