'use client'
import React from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import { decrement, increment } from './slice/counterslice'

export function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center gap-2">
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
        className="px-2 py-1 bg-blue-500 text-white rounded"
      >
        +
      </button>
      <span className="font-medium">{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
        className="px-2 py-1 bg-gray-200 rounded"
      >
        -
      </button>
    </div>
  )
}

export default Counter
