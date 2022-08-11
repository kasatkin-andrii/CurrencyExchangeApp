import {
  STORED_AMOUNT_KEY,
  STORED_FROM_CURRENCY_KEY,
  STORED_TO_CURRENCY_KEY,
} from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {createContext, useEffect, useState} from 'react'
import {LoadCurrencyList} from '../api'

interface AppContextProviderProps {
  children: React.ReactNode
}

interface AppContextProps {
  currencyList: CurrencyListProps[] | null
  fromCurrency: string
  setFromCurr: (curr: string) => void
  toCurrency: string
  setToCurr: (curr: string) => void
  amount: number
  setCount: (count: number) => void
  switchCurrency: () => void
  setupCurrencyList: () => void
}

export interface CurrencyListProps {
  currency_name: string
  currency_code: string
}

export const AppContext = createContext({} as AppContextProps)

export const AppContextProvider = ({children}: AppContextProviderProps) => {
  const [currencyList, setCurrencyList] = useState<CurrencyListProps[] | null>(
    null,
  )
  const [fromCurrency, setFromCurrency] = useState<string>('')
  const [toCurrency, setToCurrency] = useState<string>('')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    setupFromCurrency()
    setupToCurrency()
    setupAmount()
  }, [])

  const setFromCurr = (curr: string) => {
    setFromCurrency(() => curr)
    storeFromCurrency(curr)
  }

  const setToCurr = (curr: string) => {
    setToCurrency(() => curr)
    storeToCurrency(curr)
  }

  const setCount = (count: number) => {
    setAmount(() => count)
    storeAmount(count)
  }

  const storeFromCurrency = async (value: string) => {
    try {
      await AsyncStorage.setItem(STORED_FROM_CURRENCY_KEY, value)
    } catch (error) {
      console.log(error)
    }
  }

  const setupFromCurrency = async () => {
    try {
      const value = await AsyncStorage.getItem(STORED_FROM_CURRENCY_KEY)
      value !== null
        ? setFromCurrency(() => value)
        : setFromCurrency(() => 'EUR')
    } catch (error) {
      console.log(error)
    }
  }

  const storeToCurrency = async (value: string) => {
    try {
      await AsyncStorage.setItem(STORED_TO_CURRENCY_KEY, value)
    } catch (error) {
      console.log(error)
    }
  }

  const setupToCurrency = async () => {
    try {
      const value = await AsyncStorage.getItem(STORED_TO_CURRENCY_KEY)
      value !== null ? setToCurrency(() => value) : setToCurrency(() => 'UAH')
    } catch (error) {
      console.log(error)
    }
  }

  const storeAmount = async (value: number) => {
    try {
      await AsyncStorage.setItem(STORED_AMOUNT_KEY, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  const setupAmount = async () => {
    try {
      const value = await AsyncStorage.getItem(STORED_AMOUNT_KEY)
      value !== null ? setAmount(() => JSON.parse(value)) : setAmount(() => 10)
    } catch (error) {
      console.log(error)
    }
  }

  const switchCurrency = () => {
    const tempCurrency = fromCurrency
    setFromCurrency(() => toCurrency)
    setToCurrency(() => tempCurrency)
  }

  const setupCurrencyList = async () => {
    try {
      const currencies = await LoadCurrencyList()

      const list = Object.keys(currencies).map(key => ({
        currency_name: currencies[key].currency_name,
        currency_code: currencies[key].currency_code,
      }))

      setCurrencyList(() => list)
      return list
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppContext.Provider
      value={{
        currencyList,
        fromCurrency,
        setFromCurr,
        toCurrency,
        setToCurr,
        amount,
        setCount,
        switchCurrency,
        setupCurrencyList,
      }}>
      {children}
    </AppContext.Provider>
  )
}
