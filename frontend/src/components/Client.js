import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import clientActions from '../redux/actions/clientActions'
import {Button } from 'react-bootstrap';
import axios from "axios"
import {Url} from "./ApiUrl"
import { Link } from "react-router-dom"

const Client=({client, props}) =>{
    const [clients, setClients] = useState({})

    useEffect( ()=> {
        axios.get(`${Url}/client`)
        .then(data => setClients(data.data))

    }, [client])
    return (
    <>
        {clients.success  && clients.response.map((client, index) => {
            return( 
                <tr key={index}>
                    <td>{index}</td>
                    <td>{client.firstname}</td>
                    <td>{client.lastname}</td>
                    <td>{client.email}</td>
                    <Button href={"/cars/"+ client._id} className="linkClient">
                    <td>Ver autos</td>
                    </Button>
                </tr>
                )
        })}
    </>
  );
}
const mapStateToProps = state => {
  return {
    clients: state.clientReducer.clients
  }
}
const mapDispatchToProps = {
  getClient: clientActions.allClient
}
export default connect(mapStateToProps, mapDispatchToProps)(Client)
