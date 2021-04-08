import './App.css';
import Clients from './components/Clients';
import Cars from './components/Cars';
import { BrowserRouter, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { connect } from 'react-redux'
import clientActions from './redux/actions/clientActions'
import { Jumbotron, Container } from 'react-bootstrap';

function App(props) {
  console.log(props.clients)
  useEffect(()=>{
    props.getClient()
  }, [])
  return (
    <BrowserRouter>
      <a href="/">
        <h1 className="text-center">El Gran Calibre</h1>
      </a>
      {props.clients.lenth !== 0 ? <>
      <Route exact path="/" component={Clients}/>
      <Route exact path="/cars/:id" component={Cars}/>
      </> :
      <Jumbotron fluid>
          <Container>
              <h1>No tiene clientes cargados</h1>
          </Container>
      </Jumbotron>
    }
    </BrowserRouter>
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
export default connect(mapStateToProps, mapDispatchToProps)(App)

