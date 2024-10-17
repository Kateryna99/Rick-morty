'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const usePagination = <T, >(data: T[], itemsPerPage?: number) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number[]>([]);
  const [currentData, setCurrentData] = useState<T[]>([]);

  const updateUrl = useCallback((page: number) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set('page', page.toString());

    const selectedId = searchParams.get('selectedId');

    if (selectedId) {
      newParams.set('selectedId', selectedId);
    }

    router.push(`?${newParams.toString()}`);
  }, [currentPage, router])

  const handleNextPage = () => {
    const nextPage = currentPage + 1;

    setCurrentPage(nextPage);
    updateUrl(nextPage);
  };

  const handlePrevPage = () => {
    const prevPage = currentPage - 1;

    setCurrentPage(prevPage);
    updateUrl(prevPage);
  };

  const handlePageNumberClick = (pageNumber: number) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      updateUrl(pageNumber);
    }
  };

  useEffect(() => {
    const totalPagesCount = Math.ceil(data.length / itemsPerPage);

    setTotalPages(Array.from({ length: totalPagesCount }, (_, i) => i + 1));
  }, [data, itemsPerPage]);

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
    handlePageNumberClick,
  };
};
