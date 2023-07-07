import { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CollectionModal from "../components/CollectionModal";
import { css } from '@emotion/react'

function Collections() {

    const [collection, setCollection] = useState(() => {
        const collectionList = localStorage.getItem("collection");
        if (collectionList && collectionList !== 'undefined') {
          return JSON.parse(collectionList);
        } else {
          return [];
        }
      });
    
    console.log(collection);
    const [type, setType] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    };

    const addCollectionHandler = () => {
        setType(false);
        toggle();
      }
    const editCollectionHandler = (item: any) => {
        setType(true);
        setCurrentItem(item);
        toggle();
      }
    
    const addCollection = (item: any) => {
    if (currentItem) {
        const updatedData = collection.map((data : any) => 
        { return (data.id === item.id ? item : data)}) ;
        setCollection(updatedData);
        setCurrentItem(null);
        return;
    }
    item.id = collection.length + 1;
    setCollection([...collection, item]);
    };
    const deleteCollection = (name: any) => {
        const updatedItems = collection.filter((item: any) => item.name !== name);
        setCollection(updatedItems);
    };
    
    useEffect(() => {
        localStorage.setItem("collection",JSON.stringify(collection));  
        },[collection]);
    
    return (
      <Container className="border border-dark rounded bg-light py-2 w-50">
        <Row className="pb-4 text-end">
            <Col>
                <Button variant="success" onClick={() => addCollectionHandler()} >Add Collection</Button>
            </Col>
        </Row>
        {collection.map((list: any) => (
          <Row className="my-2 border border-muted">
            <Col md="auto">{list.animes.length > 0 ?
                <img alt="anime-cover" src={`${list.animes[0].coverImage.medium}`} /> :
                <img src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/default.jpg"/>}</Col>
            <Col><Link to={`/collection/${list.id}`}><h4>{list.name}</h4></Link>
            <p className="text-muted">({list.animes.length} anime(s) added)</p>
            <p className="my-2">
                <Button variant="secondary" onClick={() => editCollectionHandler(list)}>Edit</Button> <span/>
                <Button variant="danger"  onClick={() => {if(window.confirm(`Delete Collection ${list.name}?`))
                {deleteCollection(list.name)}}}>Delete</Button>
            </p>
            </Col>
          </Row>
        ))}
        <CollectionModal modalType={type} onSubmit={addCollection} editItem={currentItem} toggle={toggle} modal={modal}/>
      </Container>
    );
  }
  
  export default Collections;