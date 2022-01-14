import React, { useRef, useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../../../context/Provider'
import RenderPerformanceLog from './RenderPerformanceLog'
import RenderWords from './RenderWords'

function TypingFieldContainer() {
    const {
        typingFieldState: {
            typingStarted
        },
        typingDispatch,
    } = useContext(GlobalContext)

    const duration = 60

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
            typingDispatch({ type: 'STOP' })
            console.log("stop")
            clearInterval(timerInterval)

        }
        return () => clearInterval(timerInterval)
    }, [typingStarted, timer])


    return (
        <div className="h-screen center flex-col">
            <div className='gap-10 center'>
                <RenderWords timer={timer} />
                {showPerformance && <RenderPerformanceLog />}
            </div>
        </div>
    )
}

export default TypingFieldContainer
