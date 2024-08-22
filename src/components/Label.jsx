import React from 'react'

function Label({htmlFor, value}) {
  return (
    <>
        <label htmlFor={htmlFor} className=' font-extrabold font-mono sm:text-2xl pr-4 pl-4'>{value}</label>
    </>
  )
}

export default Label
