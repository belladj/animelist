import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import AddAnimeToCollection from '../components/AddAnimeToCollection';
import { useLocalStorageCollection } from '../LocalStorage';

const GET_ANIME_DETAILS = gql `
query ($id: Int) {
    Media (id: $id, type: ANIME) {
      id
      title {
        romaji
        native
      }
      coverImage {
        medium
        large
        color
      }
      season
      seasonYear
      episodes
      genres
      averageScore
      description
    }
}
`;

function AnimeDetails() {
    const {id} = useParams();
    const [collection, setCollection] = useLocalStorageCollection();
    const [modal, setModal] = useState(false);
    const { loading, error, data } = useQuery(GET_ANIME_DETAILS, {variables: {id}});
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    const toggleAddAnime = () => {
      setModal(!modal);
    }
    const addAnimeToCollectionHandler = (item: any) => {
      toggleAddAnime();
    };
    var desc = document.createElement("desc");
    desc.innerHTML = data.Media.description;
    return (
        <Container className="border border-dark rounded bg-light py-2 w-75">
          <Row>
            <Col md="auto" className="pb-4">
              <img alt="anime-cover" src={`${data.Media.coverImage.large}`} />
            </Col>
            <Col className="text-start">
                  <h2>{data.Media.title.romaji}</h2>
                  <p>{data.Media.season} {data.Media.seasonYear} | {data.Media.episodes} Episode(s) | Score: {data.Media.averageScore}</p>
                  <p className="text-muted">{data.Media.genres.map((item:any,index:any) => <span>{item}</span> )
                    .reduce((prev:any, curr:any) => [prev, ', ', curr])}</p>
                    {desc.innerText}
            </Col>
          </Row>
          Anime is in collection:
          {collection.map((list: any) => (
              (list.animes.find((i:any) => i.title.romaji == data.Media.title.romaji)) ? 
              <>
              <ListGroup>
              <ListGroup.Item>
                  <Link to={`/collection/${list.id}`}>{list.name}</Link>
              </ListGroup.Item>
              </ListGroup>
            </> : 
            <div></div>
            ))}
          <Row>
          </Row>
          <Row className="pt-4 my-2">
            <Col>
              <Button variant="success" onClick={() => 
                addAnimeToCollectionHandler(data.Media)}>Add to Collection</Button>
            </Col>
          </Row>
          <AddAnimeToCollection anime={data.Media} toggle={toggleAddAnime} modal={modal}/>
        </Container>
    );
  }

export default AnimeDetails;