import { combineReducers, configureStore } from "@reduxjs/toolkit";
import charactersReducer from "../features/characterSlice";
import episodesReducer from "../features/episodeSlice";
import locationReducer from "../features/locationSlice";
import filterReducer from "../features/filterSlice";

const rootReducer = combineReducers({
  characters: charactersReducer,
  episodes: episodesReducer,
  locations: locationReducer,
  filters: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
