/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootApiLink } from "@/constants/RootApiLink";
import { getPause } from "@/helpers/getPause";
import {
  setFulfilledStatus,
  setPendingRejectStatus,
} from "@/helpers/getFetchStatus";
import { Episode } from "@/types/Episode";

interface PageSliceState {
  episodesList: Episode[];
  nameQuery: string;
  episodeCodeQuery: string;
  loading: boolean;
  error: boolean;
}

const initialState: PageSliceState = {
  episodesList: [],
  nameQuery: "",
  episodeCodeQuery: "",
  loading: false,
  error: false,
};

export const fetchEpisodesData = createAsyncThunk<Episode[], string>(
  "EpisodesSlice/fetchEpisodesData",
  async () => {
    const response = await fetch(`${RootApiLink}/episode`);
    const data = await response.json();

    await getPause(1000);

    return data.results;
  },
);

export const EpisodesSlice = createSlice({
  name: "episodes",
  initialState: initialState,
  reducers: {
    setNameQuery: (state, action) => {
      state.nameQuery = action.payload;
    },
    setEpisodeCodeQuery: (state, action) => {
      state.episodeCodeQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodesData.pending, (state: PageSliceState) => {
        setPendingRejectStatus(state, ["loading", "error"], [true, false]);
      })
      .addCase(fetchEpisodesData.fulfilled, (state: PageSliceState, action) => {
        setFulfilledStatus(state, ["loading", "episodesList"], action.payload);
      })
      .addCase(fetchEpisodesData.rejected, (state: PageSliceState) => {
        setPendingRejectStatus(state, ["loading", "error"], [false, true]);
      });
  },
});

export const { setNameQuery, setEpisodeCodeQuery } = EpisodesSlice.actions;

export default EpisodesSlice.reducer;
