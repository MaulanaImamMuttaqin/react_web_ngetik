import React from 'react'
import Body from './components/main/Body'
import SideBar from './components/main/SideBar'
import ContextProvider from './context/Provider'
// import TypingField from './pages/ContentLogic/TypingField'

function App() {
  return (
    <ContextProvider>
      <SideBar />
      <Body />
    </ContextProvider>
  )
}

export default App
