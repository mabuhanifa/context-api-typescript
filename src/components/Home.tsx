import { useEffect } from "react";
import { useShop } from "../context/ShopContext";
import Product from "./Product";

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
        <div>
            <>
                <h1 className='text-center text-2xl font-bold mt-5 text-indigo-700'>Redux-Typescript</h1>
                <div className='p-5 grid grid-cols-2 md:grid-cols-3'>
                    <div className='col-span-1 md:col-span-2 grid md:grid-cols-3 gap-3 p-2'>

                        {products && products.map(product => (

                            <Product product={product} key={product.id} />
                        ))
                        }
                    </div>
                    <div className='p-2 col-span-1 '>
                    </div>
                </div>
            </>
        </div>
    )
}
