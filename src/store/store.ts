import {configureStore} from "@reduxjs/toolkit";
import charactersReducer from '../features/characterSlice';
import episodesReducer from '../features/episodeSlice';
import locationReducer from '../features/locationSlice';
import filterReducer from '../features/filterSlice';

export const store = configureStore({
    reducer: {
        characters: charactersReducer,
        episodes: episodesReducer,
        locations: locationReducer,
        filters: filterReducer
    }
})