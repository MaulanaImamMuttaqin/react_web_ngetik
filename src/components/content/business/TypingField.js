import React, { createContext, useState } from 'react'
import TypingFieldContainer from '../render/TypingField'
import words from '../../../constant/words'

export const TypingContext = createContext()

function TypingField() {


    return (
        <TypingContext.Provider
            value={words}
        >

            <TypingFieldContainer />

        </TypingContext.Provider>
    )
}

export default TypingField
