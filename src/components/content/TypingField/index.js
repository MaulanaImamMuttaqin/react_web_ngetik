import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import TypingFieldContainer from './view'
import fetchWords from './model/FetchWords'
import { GlobalContext } from '../../../context/Provider'

export const TypingContext = createContext()

function TypingField() {
    const {
        wordsDispatch
    } = useContext(GlobalContext)

    useEffect(() => {

        fetchWords('http://127.0.0.1:5000/').then(res => { wordsDispatch({ type: 'WORDS', payload: res }) })
    }, [])


    return (

        <TypingFieldContainer />

    )
}

export default TypingField
