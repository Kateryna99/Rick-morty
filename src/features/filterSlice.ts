/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

interface Filter {
  filters: string[];
  statusFilter: string;
  speciesFilter: string;
  genderFilter: string;
}

const initialState: Filter = {
  filters: [],
  statusFilter: null as string,
  speciesFilter: null as string,
  genderFilter: null as string,
};

const FilterSlice = createSlice({
  name: "FilterSlice",
  initialState,
  reducers: {
    setFilters: (state: Filter, action) => {
      state.filters.push(action.payload);
    },
    setDataFilter: (state, action) => {
      const { key, payload } = action.payload;

      state[key] = payload;
    },
  },
});

export const { setFilters, setDataFilter } = FilterSlice.actions;

export default FilterSlice.reducer;
