# Redux Toolkit setup

This folder contains the Redux Toolkit setup for the app.

Usage:

- `store` is exported from `app/redux/store.ts` (also the default export).
- Use the typed hooks exported from `app/redux/hooks.ts`:
  - `useAppDispatch()` instead of `useDispatch()`
  - `useAppSelector()` instead of `useSelector()`

Example:

```tsx
import React from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { increment } from '../redux/slice/counterslice'

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <button onClick={() => dispatch(increment())}>+1</button>
      <span>{count}</span>
    </div>
  )
}
```

Notes:
- The provider is set up in `app/provider/reduxprovider.tsx` and is wired into the root layout (`app/layout.tsx`).
- If you add new slices, register them in `app/redux/store.ts`.
