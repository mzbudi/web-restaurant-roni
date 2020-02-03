const initialState = {
    dataCategory : [],
    isLoading : false
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
                dataCategory: action.payload,
                isLoading : true,
            }
        case 'PUT_CATEGORY_PENDING':
            return{
                ...state
            }
        case 'PUT_CATEGORY_REJECTED':
            return{
                ...state,
            }
        case 'PUT_CATEGORY_FULFILLED':
            return{
                ...state,
                dataCategory: action.payload
            }
        case 'CREATE_CATEGORY_PENDING':
            return{
                ...state
            }
        case 'CREATE_CATEGORY_REJECTED':
            return{
                ...state,
            }
        case 'CREATE_CATEGORY_FULFILLED':
            return{
                ...state,
                dataCategory: action.payload
            }
        case 'DELETE_CATEGORY_PENDING':
            return{
                ...state
            }
        case 'DELETE_CATEGORY_REJECTED':
            return{
                ...state,
            }
        case 'DELETE_CATEGORY_FULFILLED':
            return{
                ...state,
                dataCategory: action.payload
            }
        default: return state
    }
}

export default category