import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Character } from "@/types/Character";
import { RootApiLink } from "@/constants/RootApiLink";
import { getPause } from "@/helpers/getPause";
import {
  setFulfilledStatus,
  setPendingRejectStatus,
} from "@/helpers/getFetchStatus";
import { Pause } from "@/enums/Pause";

interface CharactersSliceState {
  charactersList: Character[];
  nameQuery: string;
  loading: boolean;
  error: boolean;
  character: Character;
}

const initialState: CharactersSliceState = {
  charactersList: [],
  nameQuery: "",
  loading: false,
  error: false,
  character: {} as Character,
};

export const fetchCharactersData = createAsyncThunk<Character[]>(
  "CharacterSlice/fetchPageData",
  async () => {
    let allCharacters = [];

    const page1Url = `${RootApiLink}/character?page=1`;
    const page2Url = `${RootApiLink}/character?page=2`;

    const [response1, response2] = await Promise.all([
      fetch(page1Url),
      fetch(page2Url),
    ]);

    const data1 = await response1.json();
    const data2 = await response2.json();

    allCharacters = [...data1.results, ...data2.results];

    await getPause(Pause.loading);

    return allCharacters;
  },
);

export const fetchCharacterById = createAsyncThunk<Character, number>(
  "CharacterSlice/fetchCharacterById",
  async (characterId: number) => {
    const res = await fetch(`${RootApiLink}/character/${characterId}`);

    const data = await res.json();

    //await getPause(Pause.loading);

    return data;
  },
);

export const CharacterSlice = createSlice({
  name: "characters",
  initialState: initialState,
  reducers: {
    setNameQuery: (state, action) => {
      state.nameQuery = action.payload;
    },
     setCharacter: (state, action) => {
        state.character = action.payload;
     }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharactersData.pending, (state: CharactersSliceState) => {
        setPendingRejectStatus(state, ["loading", "error"], [true, false]);
      })
      .addCase(
        fetchCharactersData.fulfilled,
        (state: CharactersSliceState, action) => {
          setFulfilledStatus(
            state,
            ["loading", "charactersList"],
            action.payload,
          );
        },
      )
      .addCase(fetchCharactersData.rejected, (state: CharactersSliceState) => {
        setPendingRejectStatus(state, ["loading", "error"], [false, true]);
      })
      /*builder.addCase(fetchCharacterById.pending, (state: CharactersSliceState) => {
            setPendingRejectStatus(state, ['loading', 'error'], [true, false]);
        })*/
      .addCase(
        fetchCharacterById.fulfilled,
        (state: CharactersSliceState, action) => {
          setFulfilledStatus(state, ["loading", "character"], action.payload);
        },
      )
      .addCase(fetchCharacterById.rejected, (state: CharactersSliceState) => {
        setPendingRejectStatus(state, ["loading", "error"], [false, true]);
      });
  },
});

export const { setNameQuery, setCharacter } = CharacterSlice.actions;

export default CharacterSlice.reducer;
