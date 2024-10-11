'use client';

import { useDispatch, useSelector } from "react-redux";
import { usePagination } from "@/components/pagination/hooks/usePagination";
import { useEffect, useMemo } from "react";

import { fetchCharactersData, setNameQuery } from "@/features/characterSlice";

import { LoadingPage } from "@/components/loadingPage/LoadingPage";
import { Pagination } from "@/components/pagination/Pagination";
import { CharactersList } from "@/app/character/CharactersList/CharactersList";

import { Character } from "@/types/Character";
import { BaseCatalogContent } from "@/components/BaseCatalogPage/BaseCatalogContent";
import { FiltersComponent } from "@/components/FiltersComponent/FiltersComponent";
import {
  getFilteredList,
  getFilteredListByOption,
} from "@/helpers/getFilteredList";
import { SearchQueries } from "@/enums/SearchQueries";
import {
  GENDER_QUERIES,
  SPECIES_QUERIES,
  STATUS_QUERIES,
} from "@/constants/FilterQueries";
import { Filter } from "@/types/Filter";
import CharacterDetails from "@/app/character/CharacterDetails/CharacterDetails";

import styles from "./CharactersCatalog.module.scss";
import { PLACEHOLDER_CHARACTERS_WORDS } from "@/constants/PlaceholderWords";
import { Search } from "@/types/Search";

export const CharactersCatalog = () => {
  const dispatch = useDispatch();

  const { charactersList, loading, error, nameQuery } = useSelector(
    (state) => state.characters,
  );
  const { statusFilter, speciesFilter, genderFilter } = useSelector(
    (state) => state.filters,
  );

  const filteredListByName = useMemo(() => {
    return getFilteredList(charactersList, SearchQueries.name, nameQuery);
  }, [nameQuery, charactersList]);

  const displayedCharacters = useMemo(
    () =>
      getFilteredListByOption(
        filteredListByName,
        statusFilter,
        genderFilter,
        speciesFilter,
      ),
    [filteredListByName, statusFilter, genderFilter, speciesFilter],
  );

  const {
    handlePageNumberClick,
    currentData,
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
  } = usePagination(displayedCharacters, 6);

  const charactersFilters: Filter[] = [
    {
      id: 1,
      filters: STATUS_QUERIES,
      selectedOption: statusFilter,
      keyValue: "statusFilter",
      placeholder: "Select a Status",
    },
    {
      id: 2,
      filters: SPECIES_QUERIES,
      selectedOption: speciesFilter,
      keyValue: "speciesFilter",
      placeholder: "Select Species",
    },
    {
      id: 3,
      filters: GENDER_QUERIES,
      selectedOption: genderFilter,
      keyValue: "genderFilter",
      placeholder: "Select a Gender",
    },
  ];

  const charactersSearch: Search[] = [
    {
      id: 1,
      queryValue: nameQuery,
      wordsList: PLACEHOLDER_CHARACTERS_WORDS,
      queryType: SearchQueries.name,
      setQuery: setNameQuery,
    },
  ];

  useEffect(() => {
    dispatch(fetchCharactersData());
  }, [dispatch]);

  return (
    <>
      {loading && <LoadingPage />}
      {error && <div>Error</div>}
      {!loading && (
        <BaseCatalogContent>
          <CharacterDetails />
          {!!displayedCharacters.length && (
            <div className={styles.charactersContent}>
              <CharactersList currentData={currentData as Character[]} />
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageNumberClick={handlePageNumberClick}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </div>
          )}
          {!displayedCharacters.length && <p>No characters found</p>}
          <FiltersComponent
            dropDownList={charactersFilters}
            searchList={charactersSearch}
          />
        </BaseCatalogContent>
      )}
    </>
  );
};
