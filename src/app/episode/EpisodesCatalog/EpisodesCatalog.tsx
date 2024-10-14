"use client";

import { usePagination } from "@/components/pagination/hooks/usePagination";
import { useEffect, useMemo } from "react";

import { LoadingPage } from "@/components/loadingPage/LoadingPage";
import { Pagination } from "@/components/pagination/Pagination";
import { CharactersList } from "@/app/character/CharactersList/CharactersList";

import { BaseCatalogContent } from "@/components/BaseCatalogPage/BaseCatalogContent";
import {
  fetchEpisodesData,
  setEpisodeCodeQuery,
} from "@/features/episodeSlice";
import { Episode } from "@/types/Episode";
import { FiltersComponent } from "@/components/FiltersComponent/FiltersComponent";
import {
  PLACEHOLDER_EPISODES_CODE_WORDS,
  PLACEHOLDER_EPISODES_NAME_WORDS,
} from "@/constants/PlaceholderWords";
import { SearchQueries } from "@/enums/SearchQueries";
import { setNameQuery } from "@/features/episodeSlice";
import { getFilteredList } from "@/helpers/getFilteredList";
import {useAppDispatch, useAppSelector} from "@/store/hooks";

export const EpisodesCatalog = () => {
  const dispatch = useAppDispatch();

  const { episodesList, episodeCodeQuery, loading, error, nameQuery } =
    useAppSelector((state) => state.episodes);
  const filteredListByName = useMemo(() => {
    return getFilteredList(episodesList, "name", nameQuery);
  }, [nameQuery, episodesList]);

  const displayedEpisodes = useMemo(() => {
    return getFilteredList(filteredListByName, "episode", episodeCodeQuery);
  }, [episodeCodeQuery, filteredListByName]);

  const {
    handlePageNumberClick,
    currentData,
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
  } = usePagination(displayedEpisodes, 8);

  const episodesSearch = [
    {
      id: 1,
      queryValue: nameQuery,
      wordsList: PLACEHOLDER_EPISODES_NAME_WORDS,
      queryType: SearchQueries.name,
      setQuery: setNameQuery,
    },
    {
      id: 2,
      queryValue: episodeCodeQuery,
      wordsList: PLACEHOLDER_EPISODES_CODE_WORDS,
      queryType: SearchQueries.code,
      setQuery: setEpisodeCodeQuery,
    },
  ];

  useEffect(() => {
    dispatch(fetchEpisodesData());
  }, [dispatch]);

  return (
    <>
      {loading && <LoadingPage />}
      {error && <div>Error</div>}
      {!loading && (
        <BaseCatalogContent flex>
          <FiltersComponent searchList={episodesSearch} />
          {!!displayedEpisodes.length && (
            <>
              {/*<CharactersList currentData={currentData as Episode[]} />*/}
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageNumberClick={handlePageNumberClick}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </>
          )}
        </BaseCatalogContent>
      )}
    </>
  );
};
