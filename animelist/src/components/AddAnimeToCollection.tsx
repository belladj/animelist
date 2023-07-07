import { useEffect, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useLocalStorageCollection } from "../LocalStorage";
import CollectionModal from "./CollectionModal";

function AddAnimeToCollection(props: any) {

    const [collection, setCollection] = useLocalStorageCollection();
      
    const [anime, setAnime] = useState(props.anime);
    const addToCollection = (item: any) => {
        const found = item.animes.find((i:any) => i.title.romaji == anime.title.romaji);
        if (!found) {
        item.animes.push(anime);
        const updatedData = collection.map((data : any) => 
        { return (data.id === item.id ? item : data)}) ;
        setCollection(updatedData);
        alert('Successfully added anime to collection');
        props.toggle();
        }
        else {
            alert('Anime is already in the collection');
        }
    };
    const addNewCollection = (item: any) => {
      item.id = collection.length + 1;
      setCollection([...collection, item]);
      alert('Successfully added new collection');
      };

    return (<>
      { collection.length > 0 ?
         <Modal show={props.modal}>
            <Modal.Header closeButton onClick={props.toggle}>
                <Modal.Title>Add Anime to Collection</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ListGroup>
            {collection.map((list: any) => (
            <ListGroup.Item onClick={() => addToCollection(list)}>
               <b>{list.name}</b> <span className="text-muted">({list.animes.length} anime(s))</span>
            </ListGroup.Item>
            ))}
            </ListGroup>
            </Modal.Body>
          </Modal>
        :
        <CollectionModal onSubmit={addNewCollection} editItem={null} modalType={false} toggle={props.toggle} modal={props.modal}/>
      }
      </>
    );
  }
  
  export default AddAnimeToCollection;