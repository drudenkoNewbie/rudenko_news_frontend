import { ChangeEvent, useEffect, useState } from 'react';

import { CompletePost } from '../types';

interface PaginationProps {
  postsArray: CompletePost[];
  itemsPerPage: number;
}

const usePagination = ({ postsArray, itemsPerPage }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [slicedArray, setSlicedArray] = useState(postsArray);

  const slicePosts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setSlicedArray(postsArray.slice(startIndex, endIndex));
  };

  useEffect(() => {
    slicePosts();
  }, [currentPage, postsArray]);

  const length = postsArray.length;
  const numberOfPages = Math.ceil(length / itemsPerPage);

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
