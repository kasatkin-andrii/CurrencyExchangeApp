import axios from 'axios'
import {
  CURRENCY_API_KEY,
  LOAD_CURRENCY_URL,
  LOAD_CURRENCY_API_HOST,
  CONVERT_CURRENCY_URL,
  CONVERT_CURRENCY_API_HOST,
} from '@env'

export const LoadCurrencyList = async () => {
  try {
    const URL = LOAD_CURRENCY_URL
    const API_KEY = CURRENCY_API_KEY
    const API_HOST = LOAD_CURRENCY_API_HOST

    const options = {
      method: 'GET',
      url: URL,
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidApi-Host': API_HOST,
      },
    }

    const {data} = await axios(options)

    const currencies = await data.response.fiats

    return currencies
  } catch (error) {
    console.log(error)
  }
}

export const ConvertCurrency = async (
  haveCurrency: string,
  wantCurrency: string,
  count: number,
): Promise<number | undefined> => {
  try {
    const URL = CONVERT_CURRENCY_URL
    const API_KEY = CURRENCY_API_KEY
    const API_HOST = CONVERT_CURRENCY_API_HOST

    const options = {
      method: 'GET',
      url: URL,
      params: {have: haveCurrency, want: wantCurrency, amount: count},
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    }

    const {data} = await axios(options)
    //console.log(data.new_amount)
    return data.new_amount
  } catch (error) {
    console.log(error)
  }
}
