import { createContext, useContext, useReducer } from "react";
import { Action, ContextChild, MainState, StateType } from "../types/types";

// initial state for useReducer
const initialState: StateType = {
    products: [],
    cart: []
};

// reducer function for useReducer
const reducer = (state: StateType, action: Action) => {
    switch (action.type) {
        case "ADD_DATA":
            return {
                ...state,
                products: action.payload
            }
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter(c => c.id !== action.payload)
            };
        case "CHANGE_CART_QTY":
            return {
                ...state,
                // eslint-disable-next-line 
                cart: state.cart.filter((c) => c.id == action.payload.id ? (c.quantity = action.payload.quantity) : c.quantity)
            };
        default:
            throw new Error();
    }
};

// creating context 
export const ShopContext = createContext({} as MainState);

//context wrapper
export default function Context({ children }: ContextChild) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const store = { state, dispatch }
    return (
        <ShopContext.Provider value={store}>{children}</ShopContext.Provider>
    )
};

// hook for getting state and dispatch
export const useShop = () => {
    return useContext(ShopContext);
};