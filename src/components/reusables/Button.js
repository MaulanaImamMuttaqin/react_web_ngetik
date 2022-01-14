import React from 'react'

function Button({ children, ...props }) {

    return (
        <button
            className='text-white border border-white rounded-lg py-3 px-10 text-xl transition duration-500 ease-in-out hover:bg-white hover:text-black'
            {...props}
        >
            {children}
        </button>

    )
}

export default Button
