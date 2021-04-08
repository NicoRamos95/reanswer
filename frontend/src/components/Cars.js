import { useEffect, useState } from "react"
import {Url} from "./ApiUrl"
import axios from "axios"
import {Button, Jumbotron, Container, Modal, Form, Alert } from 'react-bootstrap';
import Car from './Car.js';

const Cars=(props) =>{
    const [id, setId] = useState("")
    const [cars, setCars] = useState([])
    const [show, setShow] = useState(false)
    const [car, setCar] = useState({ model:"",  patent: "", color:"" , clientId:"" })
    const [errors, setErrors] = useState("")



    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    
    useEffect ( () => {
        setId(props.match.params.id)  
        axios.get(`${Url}/cars/` + id)
        .then(data => setCars(data.data.response))
        window.scroll(0, 0)
        setCar({...car, clientId: id})
    }, [id, !show])

    const seeInput = e => {
      const value = e.target.value
      const campo = e.target.name
      setCar({
          ...car,
          [campo]: value
      })
    }
    const addCar = async () => {
        setErrors([])
        if (car.model !=="" &&  car.patent !== "" && car.color !=="") {
            axios.post(`${Url}/cars`, car)
            .then(res => {
                  setShow(false)
                  setCar({...car, model:"",  patent: "", color:""})
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
        <div>
          <Button variant="outline-dark" onClick={handleShow}>Agregar Auto</Button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Agregar Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="m-1 justify-content-center">
              <Form.Group className="d-flex">
                <Form.Control type="text" name="color" onChange={seeInput} required placeholder="Escribir Color" />
                <Form.Control type="text" name="patent" onChange={seeInput} required placeholder="Escribir Patente" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="text" name="model" onChange={seeInput} required placeholder="Escribir Modelo" />
              </Form.Group>
            </Form></Modal.Body>{errors && 
              <Alert> {errors} </Alert>}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={addCar}>
              Agregar cliente
            </Button>
          </Modal.Footer>
        </Modal>
            {cars.length !== 0 ? cars.map((car, index) => {
                return(
                    <Car car={car} index={index} key={index}/>
                )
                })
                :
            <Jumbotron fluid>
                <Container>
                    <h1>No tiene Autos Cargados</h1>
                </Container>
            </Jumbotron>

            }
        </>
        )
            
  
}

export default Cars