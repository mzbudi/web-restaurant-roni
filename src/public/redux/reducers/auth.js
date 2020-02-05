const initialState = {
    data : [],
    message: '' ,
    isLoading : false
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'POST_LOGIN_PENDING':
            return{
                ...state,
                isLoading:true
            }
        case 'POST_LOGIN_REJECTED':
            return{
                ...state,
                message :'Username atau Password Salah',
                isLoading:false
            }
        case 'POST_LOGIN_FULFILLED':
            return{
                ...state,
                isLoading:true,
                data: action.payload
            }
        case 'POST_REGISTER_PENDING':
            return{
                ...state,
            }
        case 'POST_REGISTER_REJECTED':
            return{
                ...state,
            }
        case 'POST_REGISTER_FULFILLED':
            return{
                ...state,
            }
        case 'LOGOUT':
            return{
                data : []
            }
        default: return state
    }
}

export default auth