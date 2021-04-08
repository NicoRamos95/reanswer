import axios from "axios"
import {Url} from "../../components/ApiUrl"

const clientActions = {
    newclient: (client) => {
        return async (dispatch) => {
            const response = await axios.post(`${Url}/client`, client)
            console.log(response)
            if (!response.data.success) {
                return response.data
            }
            dispatch({type: 'ADD_CLIENT', payload: response.data})
        }
    },
    allClient: () => {
        return async (dispatch) => {
            const response = await axios.get(`${Url}/client`)
            console.log(response)
            dispatch({type: 'CHARGE_CLIENTS', payload: response.data})
        }
    },
}

export default clientActions