import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";
import { Input, Label } from "reactstrap";

function CollectionModal(props: any) {

    const type = props.modalType;

    const [form, setValues] = useState({
        id: null,
        name: "",
        animes: []
      });
    const onChange = (e: any) => {
    setValues({
        ...form,
        [e.target.name]: e.target.value
    });
    };

    useEffect(() => {
        if (props.editItem) 
            setValues(props.editItem);
        }, [props.editItem]);

    const submitCollection = (e: any) => {
        e.preventDefault();
        if (validate()) {
            props.onSubmit(form);
            props.toggle();
        }
      };

    function validate() {
        if (!form.name.match(/^[\w-_.]*$/)) {
            alert('Invalid collection name');
            return false;
        }
        else if (JSON.parse(localStorage.getItem('collection') || '{}')
        .some((element:any) => element.name === form.name)) {
            alert('Collection name must be unique');
            return false;
        }
        else return true;
    }
    
    return (
        <>
        <Modal show={props.modal}>
            <Modal.Header closeButton onClick={props.toggle}>
                <Modal.Title>{type ? "Edit Collection" : "Add Collection"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitCollection}>
                    <FormGroup>
                        <Label for="name">Collection Name</Label>
                        <Input type="text" name="name" id="name" onChange={onChange}
                            value={form.name === null ? "" : form.name}
                        />
                    </FormGroup>
                    <br></br>
                    <Button variant="success" type="submit">Save</Button>{' '}
                </Form>
            </Modal.Body>
        </Modal>
        </>
      );

  }
  
  export default CollectionModal;