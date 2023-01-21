import { ProductType, useShop } from "../context/ShopContext";

export default function Product({ product }: { product: ProductType }) {
    const { state: { cart }, dispatch } = useShop();
    return (
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
    )
}
