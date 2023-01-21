import { useEffect } from "react";
import { useShop } from "../context/ShopContext";

export default function Home() {
    const { state: { cart, products }, dispatch } = useShop();
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`https://dummyjson.com/products`);
            const data = await response.json();
            dispatch({
                type: 'ADD_DATA',
                payload: data.products
            })
        }
        fetchProducts();
    }, [dispatch])
    return (
        <div>Home</div>
    )
}
