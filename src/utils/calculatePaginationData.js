export const calculatePaginationData = (totalItems, perPage, currentPage) => {
  const totalPages = Math.ceil(totalItems / perPage);
  return {
    totalItems,
    totalPages,
    currentPage,
    hasPreviousPage: currentPage > 1,
    hasNextPage: currentPage < totalPages,
  };
};
