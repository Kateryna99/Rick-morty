'use client';

import { useEffect, useState } from "react";

export const usePagination = <T, >(data: T[], itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<>([]);
  const [currentData, setCurrentData] = useState<T[]>([]);


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

  const handleNextPage = () => {
    if (currentPage < totalPages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageNumberClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  return {
    currentPage,
    totalPages,
    currentData,
    handleNextPage,
    handlePrevPage,
    handlePageNumberClick
  }
}