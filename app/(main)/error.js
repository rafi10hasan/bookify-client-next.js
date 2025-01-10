'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    throw new Error(error)
  }, [error])
 
  return (
    <div className='ml-30'>
      <h2 className='ml-30 text-red-500'>Something went wrong!</h2>
      <button
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}