import React, {createContext, useState} from 'react'

interface ThemeContextProviderProps {
  children: React.ReactNode
}

interface ThemeContextProps {
  darkMode: boolean
  toggleDarkMode: () => void
}

export const ThemeContext = createContext({} as ThemeContextProps)

export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => setDarkMode(prev => !prev)

  return (
    <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
      {children}
    </ThemeContext.Provider>
  )
}
