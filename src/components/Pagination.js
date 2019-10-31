import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationComponent = (props) => {
    return (
      <Pagination className="pagination-container" >
        <Pages {...props} />
      </Pagination>
    );
}

const Pages = ({totalPages, currentPage, fetchNextPage}) => {
    let pages = [];
    for(let i=1; i <= totalPages; i++) {
        pages.push(<PaginationItem active={currentPage === i ? true: false} key={i}>
                <PaginationLink href="#" onClick={() => fetchNextPage(i)} > 
                    {i}
                </PaginationLink>
            </PaginationItem>); 
    }
    return pages;
}
  
export default PaginationComponent;
