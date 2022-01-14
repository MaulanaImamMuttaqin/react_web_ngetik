import React, { createContext, useReducer } from 'react'
import auth from './reducers/auth'
import typingField from './reducers/typingField'
import words from './reducers/words'
import authStates from './inisitalStates/authStates'
import typingFieldStates from './inisitalStates/typingFieldStates'
import wordStates from './inisitalStates/wordsStates'

export const GlobalContext = createContext()

export default function ContextProvider({ children }) {
    const [authState, authDispatch] = useReducer(auth, authStates)
    const [typingFieldState, typingDispatch] = useReducer(typingField, typingFieldStates)
    const [wordsState, wordsDispatch] = useReducer(words, wordStates)

    return (
        <GlobalContext.Provider
            value={{
                authState, typingFieldState, wordsState, authDispatch, typingDispatch, wordsDispatch
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}