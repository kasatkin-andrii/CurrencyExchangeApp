import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {createContext, useEffect, useState} from 'react'
import {STORED_THEME_KEY} from '@env'

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

  useEffect(() => {
    setupDarkMode()
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
    storeDarkMode(!darkMode)
  }

  const storeDarkMode = async (value: boolean) => {
    try {
      await AsyncStorage.setItem(STORED_THEME_KEY, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  const setupDarkMode = async () => {
    try {
      const value = await AsyncStorage.getItem(STORED_THEME_KEY)
      value !== null
        ? setDarkMode(() => JSON.parse(value))
        : setDarkMode(() => true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ThemeContext.Provider value={{darkMode, toggleDarkMode}}>
      {children}
    </ThemeContext.Provider>
  )
}
