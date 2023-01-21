import { createContext, ReactNode, useContext, useReducer } from "react";

export type ProductType = {
    id: number;
    title?: string;
    description?: string;
    price?: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail?: string;
    images?: string[];
    quantity?: number;
}

type ContextChild = {
    children: ReactNode
}

type StateType = {
    products: ProductType[];
    cart: ProductType[];
}

type Action =
    { type: "ADD_DATA", payload: ProductType[] } |
    { type: "ADD_TO_CART", payload: ProductType } |
    { type: "REMOVE_FROM_CART", payload: number } |
    { type: "CHANGE_CART_QTY", payload: ProductType };

type MainState = {
    state: StateType;
    dispatch: React.Dispatch<Action>
}


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