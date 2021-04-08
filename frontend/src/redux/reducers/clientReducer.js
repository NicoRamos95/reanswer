const initialState = {
    clients:[]
}

export function clientReducer(state = initialState, action) { 
    switch (action.type) {
        case 'ADD_CLIENT':
            return {
                ...state,
                clients: action.payload.response
            }
        case 'CHARGE_CLIENTS':
            return {
                ...state,
                clients: action.payload.response
            }
        default:
            return state
    }

}