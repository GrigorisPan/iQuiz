import React from 'react';
import './stylePagination.css';

export const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='container xlarge'>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? 'active' : null}>
            <a
              onClick={(e) => {
                e.preventDefault();
                paginate(number);
              }}
              href='/#'
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
