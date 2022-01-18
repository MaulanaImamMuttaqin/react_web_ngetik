import React, { forwardRef } from 'react'
import { useContext } from 'react/cjs/react.development'
import { GlobalContext } from '../../../../context/Provider'

const InputFocusCover = forwardRef(({ open }, ref) => {

    return (
        <div className={`h-${open ? 'full' : '0'}  w-full center absolute top-0 left-0 z-90 border border-white overflow-hidden`} ref={ref}>
            <p className='text-2xl font-semibold text-gray-50 '>clicked anywhere to continue typing</p>
        </div>
    )
})


// const InputFocusCover = forwardRef((props, ref) => {
//     const {
//         typingFieldState: {
//             inputIsFocus,
//         }
//     } = useContext(GlobalContext)

//     const clickToFocus = () => {
//         console.log("click")
//         // if (!inputIsFocus) {
//         //     ref.current.focus()

//         // }
//     }

//     return (
//         <div className="h-full w-full center absolute top-0 left-0 z-90 border border-white bg-white" onClick={() => console.log("tes")}>
//             <p className='text-2xl font-semibold text-gray-50 '>clicked anywhere to continue typing</p>
//         </div>
//     )
// })

export default InputFocusCover
