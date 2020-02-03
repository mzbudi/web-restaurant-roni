const initialState = {
    data : [],
    isLoading : false
}

const order = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ORDERS_PENDING':
            return{
                ...state,
            }
        case 'GET_ORDERS_REJECTED':
            return{
                ...state,
            }
        case 'GET_ORDERS_FULFILLED':
            return{
                isLoading:true,
                data: action.payload
            }
        default: return state
    }
}

export default order