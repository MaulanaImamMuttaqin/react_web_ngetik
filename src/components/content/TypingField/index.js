import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import TypingFieldContainer from './view'
// import fetchWords from './model/fetchWords'
import useFetchData from './model/useFetchData'
import { GlobalContext } from '../../../context/Provider'

export const TypingContext = createContext()

function TypingField() {
    const { wordsDispatch } = useContext(GlobalContext)

    const fetchWords = useFetchData('http://127.0.0.1:5000/')

    useEffect(() => {
        fetchWords.then(res => { wordsDispatch({ type: 'WORDS', payload: res }) })
    }, [])


    return (

        <TypingFieldContainer />

    )
}

export default TypingField
