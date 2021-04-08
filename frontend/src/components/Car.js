
import { connect } from 'react-redux'
import clientActions from '../redux/actions/clientActions'
import {Button, Accordion, Card} from 'react-bootstrap';
import Repairs from './Repairs';

const Car=({car, index}, props) =>{
  console.log(car)
    return (
    <>  
        <Accordion defaultActiveKey="1">
            <Card>
                <Accordion.Toggle as={Button} variant="h3" eventKey={index + 1}>
                    <Card.Header>{car.model} || {car.patent} || {car.color}</Card.Header>
                </Accordion.Toggle>
                <Repairs car={car} key={index} index={index + 1}/>
            </Card>
        </Accordion>
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
export default connect(mapStateToProps, mapDispatchToProps)(Car)