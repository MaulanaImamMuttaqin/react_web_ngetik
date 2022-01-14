import React, { createContext, useReducer } from 'react'

// import Reducer
import auth from './reducers/auth'
import typingField from './reducers/typingField'
import words from './reducers/words'
import typingPerformance from './reducers/typingPerformance'


// import initial States
import authStates from './inisitalStates/authStates'
import typingFieldStates from './inisitalStates/typingFieldStates'
import wordStates from './inisitalStates/wordsStates'
import typingPerformanceStates from './inisitalStates/typingPerformanceStates'


export const GlobalContext = createContext()

export default function ContextProvider({ children }) {
    const [authState, authDispatch] = useReducer(auth, authStates)
    const [typingFieldState, typingDispatch] = useReducer(typingField, typingFieldStates)
    const [wordsState, wordsDispatch] = useReducer(words, wordStates)
    const [performance, performanceDispatch] = useReducer(typingPerformance, typingPerformanceStates)

    return (
        <GlobalContext.Provider
            value={{
                authState, typingFieldState, wordsState, performance, authDispatch, typingDispatch, wordsDispatch, performanceDispatch
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}