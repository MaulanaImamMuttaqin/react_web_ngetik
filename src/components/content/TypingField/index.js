import React, { createContext, useState, useEffect } from 'react'
import TypingFieldContainer from './view'
import fetchWords from './model/fetchWords'
import words from '../../../constant/words'
import axios from 'axios'

export const TypingContext = createContext()

function TypingField() {
    const [wordList, setWordList] = useState([])

    useEffect(() => {
        fetchWords('http://127.0.0.1:5000/').then(res => { setWordList(res) })
    }, [])

    return (
        <TypingContext.Provider
            value={wordList}
        >

            <TypingFieldContainer />

        </TypingContext.Provider>
    )
}

export default TypingField
