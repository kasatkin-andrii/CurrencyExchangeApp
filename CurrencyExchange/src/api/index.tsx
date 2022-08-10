import axios from 'axios'

export const LoadCurrencyList = async () => {
  try {
    const URL = 'https://currencyscoop.p.rapidapi.com/currencies'
    const API_KEY = 'fe49b8756cmsh1316d21f559d7f7p1e6fe0jsn27d07f15e99c'
    const API_HOST = 'currencyscoop.p.rapidapi.com'

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
    const URL =
      'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency'
    const API_KEY = 'fe49b8756cmsh1316d21f559d7f7p1e6fe0jsn27d07f15e99c'
    const API_HOST = 'currency-converter-by-api-ninjas.p.rapidapi.com'

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
