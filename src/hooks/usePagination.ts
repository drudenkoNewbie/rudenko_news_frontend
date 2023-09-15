import { ChangeEvent, useEffect, useState } from 'react';

import { CompletePost } from '../types';

interface PaginationProps {
  postsArray: CompletePost[];
  itemsPerPage: number;
}

const usePagination = ({ postsArray, itemsPerPage }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [slicedArray, setSlicedArray] = useState(postsArray);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setSlicedArray(postsArray.slice(startIndex, endIndex));
  }, [currentPage, ...postsArray]);

  const numberOfPages = Math.ceil(postsArray.length / itemsPerPage);

  const changePage = (_: ChangeEvent<unknown>, pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    changePage,
    slicedArray,
    numberOfPages
  };
};

export default usePagination;
