import { useQuery, gql, } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ListPagination from '../components/ListPagination';

const GET_ANIME = gql `
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      coverImage {
        medium
        large
        color
      }
      id
      title {
        romaji
      }
      type
    }
  }
}
`;



function AnimeList() {
    const[page,setPage]= useState(1);
    const[variables,setVariables] = useState({
      page: 1,
      perPage: 10
    })
    const paginate = (pageNumber:any) => {
      setPage(pageNumber);
   };
    const { loading, error, data, refetch } = useQuery(GET_ANIME, {variables});
    useEffect(() => {refetch({page: page})},[page])
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
      <div>
        {data.Page.media.map((item: any) => (
          <Container key={item.id} className="border border-dark rounded bg-light py-2 w-75">
            <Row className="justify-content-md-center">
              <Col md="auto"><img alt="anime-cover" src={`${item.coverImage.medium}`} /></Col>
              <Col xs lg={8} className="text-light"><Link to={`/anime/${item.id}`}><h4>{item.title.romaji}</h4></Link></Col>
            </Row>
          </Container>))}
        <ListPagination
        className="pagination"
        currentPage={page}
        lastPage={data.Page.pageInfo.lastPage} 
        postsPerPage={data.Page.pageInfo.perPage} 
        totalPosts={data.Page.pageInfo.total} 
        paginate={paginate} />
      </div>
    );
  }

export default AnimeList;