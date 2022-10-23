import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";

function Pagination(props) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className="navigation">
      {currentPage !== 1 && (
        <div className="arrow left black nav" onClick={onPrevious}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li className="pagination-item dots" key={`${pageNumber}__${i}`}>
              &#8230;
            </li>
          );
        }

        return (
          <div
            className={classnames("pagination-item item", {
              active: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
            key={`${pageNumber}__${i}`}
          >
            {pageNumber}
          </div>
        );
      })}

      {currentPage !== lastPage && (
        <div className="arrow right black nav" onClick={onNext}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
    </div>
  );
}

export default Pagination;
