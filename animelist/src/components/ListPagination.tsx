import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const ListPagination = (props:any) => {

 
   return (
      <Pagination>
      <Pagination.First onClick={() => props.paginate(1)} />
      <Pagination.Prev onClick={() => props.paginate((props.currentPage > 1 ? props.currentPage-1 : 1))}/>
      <Pagination.Ellipsis />
      <Pagination.Item active>{props.currentPage}</Pagination.Item>
      <Pagination.Ellipsis />
      <Pagination.Next onClick={() => props.paginate((props.currentPage != props.lastPage ? props.currentPage+1 : props.lastPage))}/>
      <Pagination.Last onClick={() => props.paginate(props.lastPage)}/>
    </Pagination>
   );
};
 
export default ListPagination;