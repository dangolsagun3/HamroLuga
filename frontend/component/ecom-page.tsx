'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '../app/redux/hooks'
import { increment, decrement } from '../app/redux/slice/counterslice'

const ecompage = (props: any) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const count = useAppSelector((state) => state.counter.value)

  return (
    <div className="bg-white m-4 shadow-lg rounded-lg w-[20%] transition hover:shadow-xl">
      <div onClick={() => router.push('/products/' + props.id)} className="cursor-pointer">
        <img src={props.image} alt={props.title} className="w-full h-48 object-cover rounded-t" />
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-2 truncate text-black">{props.title}</h3>
          <p className="text-lg font-bold mb-3 text-black">${props.price}</p>
        </div>
      </div>
      <div className="p-3 border-t flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => dispatch(decrement())} className="px-2 py-1 bg-gray-200 rounded">-</button>
          <span className="font-medium">{count}</span>
          <button onClick={() => dispatch(increment())} className="px-2 py-1 bg-blue-500 text-white rounded">+</button>
        </div>
        <button onClick={() => router.push('/products/' + props.id)} className="text-sm text-blue-600">View</button>
      </div>
    </div>
  )
}

export default ecompage