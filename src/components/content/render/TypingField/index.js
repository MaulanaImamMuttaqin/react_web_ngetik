import React, { useRef, useState } from 'react'
import { useEffect } from 'react/cjs/react.development'
import RenderPerformanceLog from './RenderPerformanceLog'
import RenderWords from './RenderWords'

function TypingFieldContainer() {
    const duration = 5
    const [typingStarted, setTypingStart] = useState(false)
    const [timer, setTimer] = useState(duration);
    const [showPerformance, setShowPerformance] = useState(false)

    useEffect(() => {
        let timerInterval = null
        if (typingStarted && timer !== 0) {
            console.log("start")
            timerInterval = setInterval(() => {
                setTimer(timer => timer - 1)
            }, 1000)
        } else if (timer === 0) {
            setShowPerformance(true)
            console.log("stop")
            clearInterval(timerInterval)

        }
        console.log(showPerformance)
        return () => clearInterval(timerInterval)
    }, [typingStarted, timer])


    const buttonHandler = () => {
        setTypingStart(true)
        setTimer(5)
    }


    return (
        <div className="h-screen center flex-col">
            <div className='border border-white center'>
                <RenderWords timer={timer} />
                {showPerformance && <RenderPerformanceLog />}
            </div>
        </div>
    )
}

export default TypingFieldContainer
