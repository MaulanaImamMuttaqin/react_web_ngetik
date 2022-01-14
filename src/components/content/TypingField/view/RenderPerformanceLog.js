import React from 'react'

function RenderPerformanceLog() {
    return (
        <div className='h-full w-[400px]  p-10 text-white flex flex-col items-center justify-between border border-white rounded-xl'>
            <h1 className='text-3xl font-semibold'>Typing Result</h1>
            <div className=" w-full p-5">
                <p className='flex justify-between'><span>Character Typed:</span> <span>100</span></p>
                <p className='flex justify-between'><span>Accuracy</span> <span>99%</span></p>
                <p className='flex justify-between'><span>Correct Word:</span> <span>90</span></p>
                <p className='flex justify-between'><span>Wrong Word:</span> <span>1</span></p>
            </div>
            <div className="center text-6xl  font-bold text-blue-500">
                <p>135 KPM</p>
            </div>
        </div>
    )
}

export default RenderPerformanceLog
