"use client";
import React, { useState } from "react"

const Namecomponent = () => {
  const [counter, setCounter] = useState(0)

  const increment = () => {
    let count = counter + 1
    setCounter(count)

  }

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={increment}>Increment</button>
      <h2>sfders</h2>
    </div>
  )
}

export default Namecomponent;
