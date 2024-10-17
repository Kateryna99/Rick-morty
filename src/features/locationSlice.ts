/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootApiLink } from '@/constants/RootApiLink';
import { getPause } from '@/helpers/getPause';
import {
  setFulfilledStatus,
  setPendingRejectStatus,
} from '@/helpers/getFetchStatus';
import { Location } from '@/types/Location';

interface PageSliceState {
    locationsList: Location[];
    loading: boolean;
    error: boolean;
    nameQuery: string;
    typeQuery: string;
}

const initialState: PageSliceState = {
  locationsList: [],
  loading: false,
  error: false,
  nameQuery: '',
  typeQuery: '',
};

export const fetchLocationsData = createAsyncThunk<Location[]>(
  'LocationsSlice/fetchLocationsData',
  async () => {
    const response = await fetch(`${RootApiLink}/location`);
    const data = await response.json();

    await getPause(1000);

    return data.results;
  },
);

export const LocationsSlice = createSlice({
  name: 'locations',
  initialState: initialState,
  reducers: {
    setNameQuery: (state, action) => {
      state.nameQuery = action.payload;
    },
    setLocationTypeQuery: (state, action) => {
      state.typeQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationsData.pending, (state: PageSliceState) => {
        setPendingRejectStatus(state, ['loading', 'error'], [true, false]);
      })
      .addCase(fetchLocationsData.fulfilled, (state: PageSliceState, action) => {
        setFulfilledStatus(state, ['loading', 'locationsList'], action.payload);
      },
      )
      .addCase(fetchLocationsData.rejected, (state: PageSliceState) => {
        setPendingRejectStatus(state, ['loading', 'error'], [false, true]);
      });
  },
});

export const { setNameQuery, setLocationTypeQuery } = LocationsSlice.actions;

export default LocationsSlice.reducer;
