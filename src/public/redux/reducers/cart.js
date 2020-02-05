const initialState = {
    cartData : [],
    grandTotal: 0
}


const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CART':
            let arrExist = []
            state.cartData.map((data,i)=>{
                if(data.product_id === action.data.product_id){
                    arrExist.push('1')
                }
            })
            if(arrExist.length === 0){
                return{
                    ...state,
                    cartData : [...state.cartData, 
                        {...action.data,
                        quantity: 1,
                        totalPrice: 1 * action.data.product_price}],
                    grandTotal : state.grandTotal + (1 * action.data.product_price)
                }
            }else{
                return{
                    ...state
                }
            }
        case 'REMOVE_CART':
            let cartForDelete = state.cartData.filter((data) => {return data.product_id !== action.data.product_id })
            let priceDelete = state.cartData.filter((data) => {return data.product_id === action.data.product_id })
            // console.log(priceDelete[0].product_price, priceDelete[0].quanttity, priceDelete[0].totalPrice )
            return{
                cartData : cartForDelete,
                grandTotal : state.grandTotal - parseInt(priceDelete[0].totalPrice)
            }
        case 'EMPTY_CART':
            return{
                cartData : [],
                grandTotal: 0
            }
        case 'INCREMENT_CART':
            let totalPlus = 0;
            let cartMapPlus = state.cartData.map((data,i)=>{
                if(data.product_id === action.id){
                    totalPlus = state.grandTotal + parseInt(data.product_price);
                    return{
                        ...data, quantity: data.quantity + 1,
                        totalPrice: data.product_price * (data.quantity + 1),
                    }
                }else{
                    return {
                    ...data,
                    }
                }
            })
            return{
                ...state,
                cartData : cartMapPlus,
                grandTotal: totalPlus
            }
        case 'DECREMENT_CART':
            let totalMin = 0;
            let cartMapMin = state.cartData.map((data,i)=>{
                if(data.product_id === action.id){
                    totalMin = state.grandTotal - parseInt(data.product_price);
                    return{
                        ...data, quantity: data.quantity - 1,
                        totalPrice: data.product_price * (data.quantity - 1)
                    }
                }else{
                    return {...data}
                }
            })
            return{
                ...state,
                cartData : cartMapMin,
                grandTotal: totalMin
            }
        case 'POST_CART_PENDING':
            return{
                ...state,
            }
        case 'POST_CART_REJECTED':
            return{
                ...state,
            }
        case 'POST_CART_FULFILLED':
            return{
                cartData : [],
                grandTotal: 0
            }
        default : return state
    }
}

export default cart