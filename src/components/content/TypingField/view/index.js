import React, { useRef, useState, useEffect } from 'react'
import RenderPerformanceLog from './RenderPerformanceLog'
import RenderWords from './RenderWords'

function TypingFieldContainer() {
    const duration = 60
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
            setTypingStart(false)
            console.log("stop")
            clearInterval(timerInterval)

        }
        // console.log(showPerformance)
        return () => clearInterval(timerInterval)
    }, [typingStarted, timer])


    // const buttonHandler = () => {
    //     setTypingStart(true)
    //     setTimer(5)
    // }


    const onTypingStarted = () => {

        setTypingStart(true)
    }

    return (
        <div className="h-screen center flex-col">
            <div className='gap-10 center'>
                <RenderWords timer={timer} onTypingStarted={() => onTypingStarted()} typingStarted={typingStarted} />
                {showPerformance && <RenderPerformanceLog />}
            </div>
        </div>
    )
}

export default TypingFieldContainer
