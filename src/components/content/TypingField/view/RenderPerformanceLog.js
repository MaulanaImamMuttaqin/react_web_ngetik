import React, { useContext } from 'react'
import { GlobalContext } from '../../../../context/Provider'

function RenderPerformanceLog() {
    const {
        performance: {
            wordCount,
            wordWrong,
            wordCorrect,
            charCount,
            accuracy,
            speed,
            charWrong
        },

    } = useContext(GlobalContext)

    return (
        <div className='h-full w-[400px]  p-10 text-white flex flex-col items-center justify-between border border-white rounded-xl'>
            <h1 className='text-3xl font-semibold'>Typing Result</h1>
            <div className=" w-full p-5">
                <p className='flex justify-between'><span>Word Typed:</span> <span>{wordCount}</span></p>
                <p className='flex justify-between'><span>Correct Word:</span> <span>{wordCorrect}</span></p>
                <p className='flex justify-between'><span>Wrong Word:</span> <span>{wordWrong}</span></p>
                <p className='flex justify-between'><span>Character Typed:</span> <span>{charCount}</span></p>
                <p className='flex justify-between'><span>Incorrect Character:</span> <span>{charWrong}</span></p>
                <p className='flex justify-between'><span>Accuracy</span> <span>{accuracy} %</span></p>
            </div>
            <div className="center text-6xl  font-bold text-blue-500 ">
                <p>{speed} KPM</p>
            </div>
        </div>
    )
}

export default RenderPerformanceLog
