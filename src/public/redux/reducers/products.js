const initialState = {
    dataProducts : [],
    productUpdated :[],
    deletedProducts :[],
    createdProducts : [],
    message: '' ,
    isLoading: false
}

const products = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS_PENDING':
            return{
                ...state
            }
        case 'GET_PRODUCTS_REJECTED':
            return{
                ...state,
                message :'Terjadi Kesalahan',
            }
        case 'GET_PRODUCTS_FULFILLED':
            return{
                ...state,
                isLoading : true,
                dataProducts: action.payload
            }
        case 'PUT_PRODUCTS_PENDING':
            return{
                ...state
            }
        case 'PUT_PRODUCTS_REJECTED':
            return{
                ...state,
                message :'Terjadi Kesalahan',
            }
        case 'PUT_PRODUCTS_FULFILLED':
            return{
                ...state,
                productUpdated: action.payload
            }
        case 'DELETE_PRODUCTS_PENDING':
            return{
                ...state
            }
        case 'DELETE_PRODUCTS_REJECTED':
            return{
                ...state,
                message :'Terjadi Kesalahan',
            }
        case 'DELETE_PRODUCTS_FULFILLED':
            return{
                ...state,
                deletedProducts: action.payload
            }
         case 'CREATE_PRODUCTS_PENDING':
            return{
                ...state
            }
        case 'CREATE_PRODUCTS_REJECTED':
            return{
                ...state,
                message :'Terjadi Kesalahan',
            }
        case 'CREATE_PRODUCTS_FULFILLED':
            return{
                ...state,
                createdProducts: action.payload
            }
        default: return state
    }
}

export default products