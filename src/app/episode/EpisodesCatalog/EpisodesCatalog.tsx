"use client";

import { usePagination } from "@/components/pagination/hooks/usePagination";
import { useEffect, useMemo } from "react";

import { LoadingPage } from "@/components/loadingPage/LoadingPage";
import { Pagination } from "@/components/pagination/Pagination";

import { BaseCatalogContent } from "@/components/BaseCatalogPage/BaseCatalogContent";
import {
  fetchEpisodesData,
  setEpisodeCodeQuery,
} from "@/features/episodeSlice";

import { FiltersComponent } from "@/components/FiltersComponent/FiltersComponent";
import {
  PLACEHOLDER_EPISODES_CODE_WORDS,
  PLACEHOLDER_EPISODES_NAME_WORDS,
} from "@/constants/PlaceholderWords";
import { SearchQueries } from "@/enums/SearchQueries";
import { setNameQuery } from "@/features/episodeSlice";
import { getFilteredList } from "@/helpers/getFilteredList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { EpisodesList } from '@/app/episode/EpisodesList/EpisodesList';
import { Episode } from '@/types/Episode';

import styles from '@/styles/DataCatalog.module.scss';
import { Search } from '@/types/Search';
import { ItemsPerPage } from '@/enums/Pagination';

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
  } = usePagination(displayedEpisodes, ItemsPerPage.eight);

  const episodesSearch: Search[] = [
    {
      id: 1,
      queryValue: nameQuery,
      wordsList: PLACEHOLDER_EPISODES_NAME_WORDS,
      queryType: SearchQueries.name,
      setQuery: (value) => dispatch(setNameQuery(value)),
      title: "Episode Name",
    },
    {
      id: 2,
      queryValue: episodeCodeQuery,
      wordsList: PLACEHOLDER_EPISODES_CODE_WORDS,
      queryType: SearchQueries.code,
      setQuery: (value) => dispatch(setEpisodeCodeQuery(value)),
      title: "Episode Code",
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
          {!!displayedEpisodes.length && (
            <div className={styles.catalogContent}>
              <EpisodesList episodes={currentData as Episode[]} />
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageNumberClick={handlePageNumberClick}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </div>
          )}
          {!displayedEpisodes.length && <p>No episodes found</p>}
          <FiltersComponent searchList={episodesSearch} />

        </BaseCatalogContent>
      )}
    </>
  );
};
