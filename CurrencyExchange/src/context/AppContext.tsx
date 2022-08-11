import React, {createContext, useState} from 'react'
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
  const [fromCurrency, setFromCurrency] = useState<string>('EUR')
  const [toCurrency, setToCurrency] = useState<string>('UAH')
  const [amount, setAmount] = useState(10)

  const setFromCurr = (curr: string) => setFromCurrency(() => curr)

  const setToCurr = (curr: string) => setToCurrency(() => curr)

  const setCount = (count: number) => setAmount(() => count)

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
