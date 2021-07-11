import React, {createContext, useReducer, useEffect} from 'react';
import './cart.css';
import { products } from './productAPI';
import ContextCart from './ContextCart';
import { reducer } from './reducer';

export const CartContext = createContext() 

const initialState = {
    item: products,
    totalAmount: 0,
    totalItem: 0,
};

const Cart = () => {

    // const [item, setItem] = useState(products)
    const [state, dispatch] = useReducer(reducer, initialState);

    // to delete the individual item
    const removeItem = (id) => {
        return dispatch({
            type:"REMOVE_ITEM",
            payload: id,
        })
    }

    // to delete all items 
    const clearCart = () => {
        return dispatch({type: "CLEAR_CART"})
    }

    // increment of a item
    const increment = (id) => {
        return dispatch({
            type:"INCREMENT",
            payload: id,
        })
    }

    // decrement of a item
    const decrement = (id) => {
        return dispatch({
            type:"DECREMENT",
            payload: id,
        })
    }

    // using useEffect to update the data
    useEffect(() => {
        dispatch({type:"GET_TOTAL"});
        // console.log('awesome');
    },[state.item] )

    return (
        <>
            <CartContext.Provider value={{...state, removeItem, clearCart, increment, decrement}}>
                <ContextCart />
           </CartContext.Provider> 
        </>
    )
}

export default Cart
