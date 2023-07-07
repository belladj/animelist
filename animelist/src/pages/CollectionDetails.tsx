import { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import CollectionModal from "../components/CollectionModal";
import { getCollectionData, useLocalStorageCollection } from "../LocalStorage";

function CollectionDetails() {

    const {id} = useParams();
    
    const [collection, setCollection] = useLocalStorageCollection();
    const [collectionData, setCollectionData] = useState(() => getCollectionData(id));
    const [type, setType] = useState(true);
    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };
    const editCollectionDetail = (item: any) => {
        setCollectionData(item);
        toggle();
    }
    const updateCollection = (item: any) => {
            const updatedData = collection.map((data : any) => 
            { return (data.id === item.id ? item : data)}) ;
            setCollection(updatedData);
        };

    const deleteAnime = (name: any) => {
        const updatedAnime = collectionData.animes.filter((item: any) => item.title.romaji !== name);
        setCollectionData({...collectionData, animes: updatedAnime});
        const updatedData = collection.map((data: any)  => 
        { return (data.id === collectionData.id ? collectionData : data)}) ;
        setCollection(updatedData);
    };
        
    return (
      <Container className="border border-dark rounded bg-light py-2 w-50">
        <Row>
            <Col className="text-start">
            <h2>{collection.find((item:any) => item.id == id).name}</h2>
            </Col>
            <Col className="text-end">
            <Button value="Edit" variant="secondary" onClick={() => editCollectionDetail(collectionData)}>Edit Collection</Button>
            </Col>
        </Row>
        <Row>
            <Col>
            <h5>Anime count: {collection.find((item:any) => item.id == id).animes.length}</h5>
            </Col>
        </Row>
        <Row>
            <Col>
            <ListGroup>
            {collection.find((item:any) => item.id == id).animes.map((item: any) => (
            <ListGroup.Item>
                <Link to={`/anime/${item.id}`}>{item.title.romaji}</Link>{' '}
                <Button variant="outline-danger" onClick={() => {if(window.confirm(`Delete ${item.title.romaji}?`))
                {deleteAnime(item.title.romaji)}}}>Delete</Button>
            </ListGroup.Item>
            ))}
            </ListGroup>
            </Col>
        </Row>
        <CollectionModal onSubmit={updateCollection} editItem={collectionData} modalType={type} toggle={toggle} modal={modal}/>
      </Container>
    );
  }
  
  export default CollectionDetails;