import React from 'react'


export const Pagination = ({postsPerPage, length, handlePagination}) => {

    const paginationNumbers = [];
    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumbers.push(i);
      }

  return (

    <div className='pagination'>
      {paginationNumbers.map((pageNumber) => (
        <button key={pageNumber}>{pageNumber}</button>
      ))}
    </div>
  )
}
