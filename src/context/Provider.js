import React, { createContext, useReducer } from 'react'

import auth from './reducers/auth'
import authStates from './inisitalStates/authStates'

export const GlobalContext = createContext()

export default function ContextProvider({ children }) {
    const [authState, authDispatch] = useReducer(auth, authStates)


    return (
        <GlobalContext.Provider
            value={{
                authState, authDispatch
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}