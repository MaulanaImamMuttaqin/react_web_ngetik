import React, { useState } from 'react'
// import { ChevronRight } from '../reusables/Logo'
import { ChevronRightIcon } from '@heroicons/react/solid'

function SideBar() {
    const [open, setOpen] = useState(false)

    const toggleSidebar = () => {
        setOpen(!open)
    }
    return (
        <div className=' w-36 h-screen fixed transition duration-500 ease-in-out flex p-5 z-100'
            style={{ transform: `translateX(${!open ? '-100' : '0'}%)` }}
            onMouseOut={() => toggleSidebar()}
            onMouseOver={() => toggleSidebar()}
        >
            <div className="h-full w-full  flex items-center border-r-2 border-blue-500">
                <div className=' h-5/6 w-full flex flex-col justify-around items-center'>
                    <div className="h-14 w-14 rounded-full border border-white transition ease-in-out duration-300 hover:cursor-pointer hover:bg-blue-500"></div>
                    <div className="h-14 w-14 rounded-full border border-white transition ease-in-out duration-300 hover:cursor-pointer hover:bg-blue-500"></div>
                    <div className="h-14 w-14 rounded-full border border-white transition ease-in-out duration-300 hover:cursor-pointer hover:bg-blue-500"></div>
                    <div className="h-14 w-14 rounded-full border border-white transition ease-in-out duration-300 hover:cursor-pointer hover:bg-blue-500"></div>
                    <div className="h-14 w-14 rounded-full border border-white transition ease-in-out duration-300 hover:cursor-pointer hover:bg-blue-500"></div>
                </div>

                <div
                    className={`h-14 w-14 absolute transition translate-x-[190%] rotate-${!open ? '0' : '180'} text-white center rounded-full `}
                >
                    <ChevronRightIcon className='text-blue-500' />
                </div>
            </div>

        </div>
    )
}

export default SideBar
