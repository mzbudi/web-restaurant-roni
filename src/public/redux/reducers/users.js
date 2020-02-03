const initialState = {
    usersData : [],
    isLoading : false
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS_PENDING':
            return{
                ...state,
            }
        case 'GET_USERS_REJECTED':
            return{
                ...state,
            }
        case 'GET_USERS_FULFILLED':
            return{
                userData: action.payload,
                isLoading : true
            }
        default: return state
    }
}

export default users