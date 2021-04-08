import { useState } from 'react';
import { connect } from 'react-redux'
import clientActions from '../redux/actions/clientActions'
import Client from './Client.js';
import { Button, Modal, Form, Alert, Table } from 'react-bootstrap';

const Clients=(props) =>{
    const [show, setShow] = useState(false)
    const [client, setClient] = useState({ firstname:"",  lastname: "", email:"" })
    const [errors, setErrors] = useState("")
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
  
    const seeInput = e => {
      const value = e.target.value
      const campo = e.target.name
      setClient({
          ...client,
          [campo]: value
      })
    }
    const addClient = async () => {
      setErrors([])
      if (client.firstname !==""&&  client.lastname !== ""&& client.email !=="") {
        const response = await props.addclient(client)
        if (response && !response.success) {
            setErrors(response.errores)
        } else {
          setShow(false)
          setClient({firstname:"",  lastname: "", email:""})
        }
      } else {
        setErrors("Complete todos los campos")
      }
    }
    return (
      <>
        <div>
          <Button variant="outline-dark" onClick={handleShow}>Agregar cliente</Button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Agregar Cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="m-1 justify-content-center">
              <Form.Group className="d-flex">
                <Form.Control type="text" name="firstname" onChange={seeInput} required placeholder="Escribir nombre" />
                <Form.Control type="text" name="lastname" onChange={seeInput} required placeholder="Escribir apellido" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="email" name="email" onChange={seeInput} required placeholder="Enter email" />
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
              Agregar cliente
            </Button>
          </Modal.Footer>
        </Modal>
        
        
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Ver auto</th>
            </tr>
            </thead>
            <tbody>

                <Client client={client}/>

            </tbody>
        </Table>
      </>)
}
const mapDispatchToProps = {
  addclient: clientActions.newclient
}
export default connect(null, mapDispatchToProps)(Clients)