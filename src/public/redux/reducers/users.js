const initialState = {
    usersData : [],
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
                userData: action.payload
            }
        default: return state
    }
}

export default users