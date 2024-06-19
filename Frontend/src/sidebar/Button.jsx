import React from 'react'

const Button = ({onClickHandler,value,title}) => {
  return (
   <button onClick={onClickHandler} value={value} className={'px-1.5 py-0.5 border text-base hover:bg-blue hover:text-white'}>
    {title}
   </button>
  )
}

export default Button