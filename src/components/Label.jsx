import React from 'react'

function Label({htmlFor, value}) {
  return (
    <>
        <label htmlFor={htmlFor} className=' font-extrabold font-mono sm:text-2xl sm:pr-4 sm:pl-4'>{value}</label>
    </>
  )
}

export default Label
