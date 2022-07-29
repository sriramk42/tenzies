import React from 'react'

const Die = ({value, isFixed, updateFixed, id}) => {
  return (
    <div 
      className={`die ${isFixed ? "bg-green" : ""}`}
      onClick={updateFixed}
    >
      {value}
    </div>
  )
}

export default Die