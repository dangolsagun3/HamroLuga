import React from 'react'
import { useRouter } from 'next/navigation'

const ecompage = (props: any) => {
    const router = useRouter()
  return (
    <div onClick={() => router.push('/products/' + props.id)} className="bg-white m-4 shadow-lg rounded-lg w-[20%] cursor-pointer hover:shadow-xl transition">
      <img src={props.image} alt={props.title} className="w-full h-48 object-cover rounded-t"/>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-2 truncate text-black">{props.title}</h3>     
        <p className="text-lg font-bold mb-3 text-black">${props.price}</p>
      </div>
    </div>
    )
}

export default ecompage