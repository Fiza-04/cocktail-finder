import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface FiltersState {
  letter: string
  search: string
}

const initialState: FiltersState = { letter: 'A', search: '' }

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    // update filters
    setLetter(state, action: PayloadAction<string>) {
      state.letter = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setFilters(state, action: PayloadAction<FiltersState>) {
      state.letter = action.payload.letter
      state.search = action.payload.search
    },
  },
})

export const { setLetter, setSearch, setFilters } = filtersSlice.actions
export default filtersSlice.reducer
