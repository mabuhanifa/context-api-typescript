import { createContext, useContext, useReducer } from "react";
import { Action, ContextChild, MainState, StateType } from "../types/types";



const initialState: StateType = {
    products: [],
    cart: []
}

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
                // eslint-disable-next-line eqeqeq
                cart: state.cart.filter((c) => c.id == action.payload.id ? (c.quantity = action.payload.quantity) : c.quantity)
            };
        default:
            throw new Error();
    }
}
export const ShopContext = createContext({} as MainState);

export default function Context({ children }: ContextChild) {

    const [state, dispatch] = useReducer(reducer, initialState);
    const store = { state, dispatch }
    return (
        <ShopContext.Provider value={store}>{children}</ShopContext.Provider>
    )
}

export const useShop = () => {
    return useContext(ShopContext);
}