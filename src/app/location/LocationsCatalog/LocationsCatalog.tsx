"use client";

import { usePagination } from "@/components/pagination/hooks/usePagination";
import { useEffect, useMemo } from 'react';

import { LoadingPage } from "@/components/loadingPage/LoadingPage";
import { Pagination } from "@/components/pagination/Pagination";


import { BaseCatalogContent } from "@/components/BaseCatalogPage/BaseCatalogContent";
import { fetchLocationsData, setLocationTypeQuery, setNameQuery } from '@/features/locationSlice';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LocationsList } from '@/app/location/LocationsList/LocationList';
import { Location } from '@/types/Location';
import styles from '@/styles/DataCatalog.module.scss';
import { FiltersComponent } from '@/components/FiltersComponent/FiltersComponent';
import { PLACEHOLDER_LOCATIONS_NAME_WORDS, PLACEHOLDER_LOCATIONS_TYPE_WORDS }
  from '@/constants/PlaceholderWords';
import { SearchQueries } from '@/enums/SearchQueries';
import { Search } from '@/types/Search';
import { ItemsPerPage } from '@/enums/Pagination';
import { getFilteredList } from '@/helpers/getFilteredList';


export const LocationsCatalog = () => {
  const dispatch = useAppDispatch();
  const { locationsList, loading, error, nameQuery, typeQuery } = useAppSelector(
    (state) => state.locations,
  );

  const updatedList = useMemo(() => {
    return locationsList.map(location => {
      return {
        ...location,
        image: `/locations/${location.name}.jpg`
      }
    });
  },[locationsList]);

  const filteredListByName = useMemo(() => {
    return getFilteredList(updatedList, "name", nameQuery);
  }, [nameQuery, updatedList]);

  const displayedLocations = useMemo(() => {
    return getFilteredList(filteredListByName, "type", typeQuery);
  }, [typeQuery, filteredListByName]);

  const {
    handlePageNumberClick,
    currentData,
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
  } = usePagination(displayedLocations, ItemsPerPage.eight);

  const locationsSearch:Search[] = [
    {
      id: 1,
      queryValue: nameQuery,
      wordsList: PLACEHOLDER_LOCATIONS_NAME_WORDS,
      queryType: SearchQueries.name,
      setQuery: (value) => dispatch(setNameQuery(value)),
      title: 'Location Name',
    },
    {
      id: 2,
      queryValue: typeQuery,
      wordsList: PLACEHOLDER_LOCATIONS_TYPE_WORDS,
      queryType: SearchQueries.type,
      setQuery: (value) => dispatch(setLocationTypeQuery(value)),
      title: 'Location Type',
    },
  ]

  useEffect(() => {
    dispatch(fetchLocationsData());
  }, [dispatch]);

  return (
    <>
      {loading && <LoadingPage />}
      {error && <div>Error</div>}
      {!loading && (
        <BaseCatalogContent flex>
          {!!currentData.length && (
            <div className={styles.catalogContent}>
              <LocationsList locations={currentData as Location[]} />
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                handlePageNumberClick={handlePageNumberClick}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
              />
            </div>
          )}
          {!currentData.length && <p>No location found</p>}
          <FiltersComponent searchList={locationsSearch} />

        </BaseCatalogContent>
      )}
    </>
  );
};
