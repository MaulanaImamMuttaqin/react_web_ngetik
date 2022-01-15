import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../../../context/Provider'
import RenderPerformanceLog from './RenderPerformanceLog'
import RenderWords from './RenderWords'

function TypingFieldContainer() {
    const {
        typingFieldState: {
            typingStarted,
            timer,
            isPaused
        },
        performance: {
            showPerformance
        },
        performanceDispatch,
        typingDispatch,
    } = useContext(GlobalContext)


    useEffect(() => {
        let timerInterval = null

        if (typingStarted && timer !== 0) {
            timerInterval = setInterval(() => {
                if (!isPaused) {
                    typingDispatch({ type: "DECREASE_TIME" })
                }
            }, 1000)
        } else if (timer === 0) {
            performanceDispatch({ type: 'UPLOAD' })
            performanceDispatch({ type: "SHOW" })
            typingDispatch({ type: 'STOP' })
            clearInterval(timerInterval)

        }
        return () => clearInterval(timerInterval)
    }, [typingStarted, timer, isPaused])


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
