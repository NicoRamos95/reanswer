import { useEffect, useState } from 'react';
import {Button, Accordion, Card, Jumbotron, Container, Image, Modal, Form, Alert} from 'react-bootstrap';
import axios from "axios"
import {Url} from "./ApiUrl"

const Repairs=({car, index},props) =>{
    const [id, setId] = useState("")
    const [repairs, setRepairs] = useState([])
    const [show, setShow] = useState(false)
    const [repair, setRepair] = useState({ id: "",  description: "" })
    const [errors, setErrors] = useState("")
    
    

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    useEffect ( () => {
        setRepairs(car.repair)
        setId(car._id)  
        setRepair({...repair, id: id})
    }, [repairs])

    const seeInput = e => {
      const value = e.target.value
      const campo = e.target.name
      setRepair({
          ...repair,
          [campo]: value
      })
    }
    const addClient = async () => {
      setErrors([])
      console.log(repairs)
      if (repair.id !== "" &&  repair.description !== "") {
        axios.post(`${Url}/repair`, repair)
        .then(res => {
              setShow(false)
              setRepair({...repair,  description: "" })
        })
        .catch(error => {
            setErrors(error)
            console.log(error)
        })
      } else {
        setErrors("Complete todos los campos")
      }
    }
    return (
    <>
    <Button variant="outline-dark" onClick={handleShow}>Agregar reparacion</Button>
    {repairs.length !== 0 ? 
           repairs.map((repair) => {
            var d = new Date(repair.date);
            var date = d.toUTCString();
               return(
                <Accordion.Collapse eventKey={index} key={car.repair._id}>
                    <Card.Body>
                        <div className="d-flex justify-content-between" > 
                            <h1>{date}</h1>
                        </div>   
                        <div className="d-flex justify-content-around">
                            <Image src="https://via.placeholder.com/400x400" fluid />
                            <h1>{repair.description}</h1>
                        </div>
                        <div>
                        </div>
                    </Card.Body>
                </Accordion.Collapse>
               )
            })
        :
        <Accordion.Collapse eventKey={index}>
            <Card.Body className="d-flex">
            <Jumbotron fluid>
                <Container>
                    <h1>No tiene reparaciones</h1>
                </Container>
            </Jumbotron>
            </Card.Body>
        </Accordion.Collapse>
    }
    
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Agregar reparacion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="m-1 justify-content-center">
              <Form.Group className="d-flex">
                <Form.Control type="textarea" name="description" onChange={seeInput} required placeholder="Escribir reparacion  " />
              </Form.Group>
            </Form></Modal.Body>
            <div>{errors && 
              <Alert> {errors} </Alert>}
            </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={addClient}>
              Agregar reparacion
            </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
}
export default Repairs