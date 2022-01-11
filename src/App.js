import React from 'react'
import ContextProvider from './context/Provider'
import TypingField from './pages/ContentLogic/TypingField'

function App() {
  return (
    <ContextProvider>
      <TypingField />
    </ContextProvider>
  )
}

export default App
