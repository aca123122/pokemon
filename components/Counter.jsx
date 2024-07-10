'use client'
import React,{useState} from 'react'



const Counter = () => {

    const [counter, setCounter] = useState(0)

    const increment = () => {
        let count = counter + 1
        setCounter(count)
    
      }

  return (
    <div>
     <h1>{counter}</h1>
     <button onClick={increment}>Increment</button>

    </div>
   
  )
}

export default Counter