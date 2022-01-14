import React from 'react'
import Body from './components/main/Body'
import ContextProvider from './context/Provider'
// import TypingField from './pages/ContentLogic/TypingField'

function App() {
  return (
    <ContextProvider>
      <Body />
    </ContextProvider>
  )
}

export default App
