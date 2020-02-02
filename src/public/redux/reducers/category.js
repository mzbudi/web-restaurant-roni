const initialState = {
    dataCategory : [],
}

const category = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORY_PENDING':
            return{
                ...state
            }
        case 'GET_CATEGORY_REJECTED':
            return{
                ...state,
            }
        case 'GET_CATEGORY_FULFILLED':
            return{
                ...state,
                dataCategory: action.payload
            }
        default: return state
    }
}

export default category