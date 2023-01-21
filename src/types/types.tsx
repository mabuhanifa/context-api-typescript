import { ReactNode } from "react";

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

export type ContextChild = {
    children: ReactNode
}

export type StateType = {
    products: ProductType[];
    cart: ProductType[];
}

export type Action =
    { type: "ADD_DATA", payload: ProductType[] } |
    { type: "ADD_TO_CART", payload: ProductType } |
    { type: "REMOVE_FROM_CART", payload: number } |
    { type: "CHANGE_CART_QTY", payload: ProductType };

export type MainState = {
    state: StateType;
    dispatch: React.Dispatch<Action>
}
