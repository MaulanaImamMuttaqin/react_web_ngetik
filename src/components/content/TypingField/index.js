import React, { createContext, useEffect, useContext } from 'react'
import axios from 'axios'
import TypingFieldContainer from './view'
import { BASE_URL } from '../../../constant/constants'
import { GlobalContext } from '../../../context/Provider'

export const TypingContext = createContext()

function TypingField() {
    const {
        performance: {
            wordCount,
            wordWrong,
            wordCorrect,
            upload
        },
        wordsState: {
            update
        },
        performanceDispatch,
        wordsDispatch
    } = useContext(GlobalContext)


    useEffect(() => {
        // fetching Words
        wordsDispatch({ type: "FETCHING" })
        axios(BASE_URL)
            .then(res => {
                wordsDispatch({
                    type: 'WORDS',
                    payload: res.data.words
                })
            })
            .catch(err => {
                throw err
            })

    }, [update])

    useEffect(() => {
        if (upload) {
            axios.post(`${BASE_URL}/upload`, {
                wordCount,
                wordWrong,
                wordCorrect
            })
                .then(res => {
                    performanceDispatch({ type: 'STOP_UPLOAD' })
                })
                .catch(err => {
                    throw console.log(err)
                })
        }
    }, [upload])

    return (

        <TypingFieldContainer />

    )
}

export default TypingField
