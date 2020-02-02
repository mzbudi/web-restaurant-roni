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
        default: return state
    }
}

export default auth