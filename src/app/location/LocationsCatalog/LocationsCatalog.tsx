"use client";

import { useDispatch } from "react-redux";
import { usePagination } from "@/components/pagination/hooks/usePagination";
import { useEffect } from "react";

import { LoadingPage } from "@/components/loadingPage/LoadingPage";
import { Pagination } from "@/components/pagination/Pagination";
import { CharactersList } from "@/app/character/CharactersList/CharactersList";

import { BaseCatalogContent } from "@/components/BaseCatalogPage/BaseCatalogContent";
import { fetchLocationsData } from "@/features/locationSlice";
import { Location } from "@/types/Location";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const LocationsCatalog = () => {
  const dispatch = useAppDispatch();

  const { locationsList, loading, error } = useAppSelector(
    (state) => state.locations,
  );
  const {
    handlePageNumberClick,
    currentData,
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
  } = usePagination(locationsList, 8);

  useEffect(() => {
    dispatch(fetchLocationsData());
  }, [dispatch]);

  return (
    <>
      {loading && <LoadingPage />}
      {error && <div>Error</div>}
      {!!locationsList.length && !loading && (
        <BaseCatalogContent>
          {/*<CharactersList currentData={currentData as Location[]} />*/}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageNumberClick={handlePageNumberClick}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </BaseCatalogContent>
      )}
    </>
  );
};
