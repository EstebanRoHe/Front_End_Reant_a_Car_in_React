import React from 'react';
import ReactPaginate from 'react-paginate';
import './Paginate.css';

const Pagination = ({ pageCount, handlePageChange }) => {
  return (
    <ReactPaginate
      previousLabel={<i className="bi bi-arrow-left-circle-fill"></i>}
      nextLabel={<i className="bi bi-arrow-right-circle-fill"></i>}
      pageCount={pageCount}
      onPageChange={handlePageChange}
      containerClassName={'pagination'}
      activeClassName={'active'}
      previousClassName={'paginate-arrow'}
      nextClassName={'paginate-arrow'}
      pageClassName={'page-count'}
    />
  );
};

export default Pagination;