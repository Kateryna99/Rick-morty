'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export const usePagination = <T, >(data: T[], itemsPerPage) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<>([]);
  const [currentData, setCurrentData] = useState<T[]>([]);

  const updateUrl = (page: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', page.toString());
    router.push(`?${newParams.toString()}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages.length) {
      const nextPage = currentPage + 1;

      setCurrentPage(nextPage);
      updateUrl(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;

      setCurrentPage(prevPage);
      updateUrl(prevPage);
    }
  };

  const handlePageNumberClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateUrl(pageNumber);
  }

  useEffect(() => {
    const totalPagesCount = Math.ceil(data?.length / itemsPerPage);
    const pagesArray = Array.from({ length: totalPagesCount }, (_, i) => i + 1);

    setTotalPages(pagesArray);
  }, [data]);

  useEffect(() => {
    const newCurrentData = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

    setCurrentData(newCurrentData);
  }, [data, currentPage]);

  useEffect(() => {
    const pageFromUrl = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;

    setCurrentPage(pageFromUrl);
  }, [searchParams]);

  return {
    currentPage,
    totalPages,
    currentData,
    handleNextPage,
    handlePrevPage,
    handlePageNumberClick
  }
}