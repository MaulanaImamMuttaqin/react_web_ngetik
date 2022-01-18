import React, { useState, useEffect, useContext } from 'react'
import { GlobalContext } from '../../../../context/Provider'
import RenderPerformanceLog from './RenderPerformanceLog'
import RenderWords from './RenderWords'
import typingFieldStates from '../../../../context/inisitalStates/typingFieldStates'
function TypingFieldContainer() {
    const {
        typingFieldState: {
            typingStarted,
            timer,
            isPaused
        },
        performance: {
            showPerformance,
            charCount,
            charWrong,
            wordWrong
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
            calculateTypingSpeed(charCount, charWrong)
            clearInterval(timerInterval)

        }
        return () => clearInterval(timerInterval)
    }, [typingStarted, timer, isPaused])

    const calculateTypingSpeed = (char, wrong) => {
        let gross = char / 5
        let time = typingFieldStates.timer / 60
        let net = Math.round((gross - wrong) / time)
        // console.log(char)
        // console.log(net, gross)
        let accuracy = (((char - wrong) / char) * 100).toFixed(1)
        performanceDispatch({ type: "CALCULATE", payload: { net, accuracy } })

    }
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
