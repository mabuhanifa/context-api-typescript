import { useEffect } from "react";
import { useShop } from "../context/ShopContext";

export default function Home() {
    const { state: { cart, products }, dispatch } = useShop();
    console.log(cart)
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

                            <div key={product.id} className="border border-gray-300 p-3 rounded shadow-lg  relative h-[360px]">

                                <img src={product.thumbnail} alt="" className='h-32 w-60 object-cover' />

                                <h2 className='text-lg font-bold my-3'>{product.title}</h2>
                                <p>
                                    {product.description}
                                </p>
                                <h4 className='font-bold'>Price : {product.price}</h4>
                                <div className='flex justify-center absolute bottom-2 left-2 right-2'>

                                    {
                                        cart.some((c) => c.id === product.id) ?

                                            <button className="bg-red-500 w-full py-2  text-white rounded"
                                                onClick={() => dispatch({
                                                    type: "REMOVE_FROM_CART",
                                                    payload: product.id
                                                })}
                                            >REMOVE</button>

                                            :

                                            <button className='w-full py-2 bg-indigo-700 text-white rounded'
                                                onClick={() => dispatch({
                                                    type: "ADD_TO_CART",
                                                    payload: product
                                                })}
                                            >Add to Cart</button>

                                    }

                                </div>
                            </div>
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
