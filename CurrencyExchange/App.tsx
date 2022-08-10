import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
import {ThemeContextProvider} from './src/context/ThemeContext'
import {AppContextProvider} from './src/context/AppContext'

const App = () => {
  return (
    <ThemeContextProvider>
      <AppContextProvider>
        <HomeScreen />
      </AppContextProvider>
    </ThemeContextProvider>
  )
}

export default App
