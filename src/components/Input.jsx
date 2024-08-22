import React from 'react'

function Input({type,placeholder,className,value,onChange,name,id}) {
  return (
    <>
     <input
      type={type}
      placeholder={placeholder}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className={`outline-none border p-3 rounded-lg bg-zinc-100 font-serif ${className}`}
       />
    </>
  )
}

export default Input
