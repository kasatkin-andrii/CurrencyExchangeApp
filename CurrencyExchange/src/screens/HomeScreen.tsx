import React, {useContext, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ExchangeIcon from 'react-native-vector-icons/FontAwesome5'
import {colors} from '../constants'
import ChooseCurrency from '../components/ChooseCurrency'
import ExchangeDisplay from '../components/ExchangeDisplay'
import CurrencyItem from '../components/CurrencyItem'
import {ThemeContext} from '../context/ThemeContext'
import {AppContext, CurrencyListProps} from '../context/AppContext'

const APP_NAME = 'Currency Exchange'

const HomeScreen = () => {
  const {darkMode, toggleDarkMode} = useContext(ThemeContext)
  const {
    setupCurrencyList,
    currencyList,
    switchCurrency,
    fromCurrency,
    toCurrency,
  } = useContext(AppContext)

  const [searchValue, setSearchValue] = useState('')
  const [filteredData, setFilteredData] = useState<CurrencyListProps[] | null>(
    null,
  )

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const init = async () => {
    const list = await setupCurrencyList()
    //@ts-ignore
    setFilteredData(() => list, searchFilter(searchValue))
  }

  const searchFilter = (text: string) => {
    if (text) {
      const newData = currencyList?.filter(item => {
        const codeData = item.currency_code
          ? item.currency_code.toUpperCase()
          : ''.toUpperCase()
        const nameData = item.currency_name
          ? item.currency_name.toUpperCase()
          : ''.toUpperCase()
        const textData = text.toUpperCase()
        return (
          codeData.indexOf(textData) > -1 || nameData.indexOf(textData) > -1
        )
      })
      newData && setFilteredData(() => newData)
      setSearchValue(() => text)
    } else {
      setFilteredData(() => currencyList)
      setSearchValue(() => text)
    }
  }

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: darkMode ? colors.black : colors.white,
    },
    darkModeIcon: {},
    header: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    darkModeIconContainer: {
      position: 'absolute',
      top: 20,
      right: 20,
      transform: [{rotateY: '180deg'}],
    },
    appName: {
      fontSize: 18,
      fontWeight: '600',
      color: darkMode ? colors.white : colors.black,
    },
    currencyContainer: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    exchangeContainer: {
      flex: 3,
    },
    listCurrency: {
      flex: 5,
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    searchContainer: {
      backgroundColor: darkMode ? colors.lightGray : colors.white,
      marginBottom: 10,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      shadowColor: darkMode ? colors.lightGray : colors.black,
      shadowOffset: {
        height: 10,
        width: 10,
      },
      elevation: 5,
    },
    searchIcon: {
      marginRight: 5,
    },
    searchInput: {
      color: darkMode ? colors.white : colors.black,
      flex: 1,
      fontSize: 16,
      fontWeight: '400',
      fontStyle: 'italic',
    },
  })
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.appName}>{APP_NAME}</Text>
        <TouchableOpacity
          style={styles.darkModeIconContainer}
          onPress={() => toggleDarkMode()}>
          <Icon
            name={darkMode ? 'wb-sunny' : 'nightlight-round'}
            size={35}
            color={darkMode ? colors.white : colors.black}
            style={styles.darkModeIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.currencyContainer}>
        {currencyList === null ? (
          <View>
            <ActivityIndicator
              size={'large'}
              color={darkMode ? colors.white : colors.black}
            />
          </View>
        ) : (
          <>
            <ChooseCurrency defaultCurrency={fromCurrency} type={'from'} />
            <TouchableOpacity onPress={() => switchCurrency()}>
              <ExchangeIcon name="exchange-alt" size={20} color={colors.blue} />
            </TouchableOpacity>
            <ChooseCurrency defaultCurrency={toCurrency} />
          </>
        )}
      </View>
      <View style={styles.exchangeContainer}>
        <ExchangeDisplay />
      </View>
      <View style={styles.listCurrency}>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={24}
            color={darkMode ? colors.white : colors.black}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholderTextColor={darkMode ? colors.white : colors.black}
            placeholder="search for currency"
            value={searchValue}
            onChangeText={text => searchFilter(text)}
          />
        </View>
        {filteredData === null ? (
          <ActivityIndicator
            size={'large'}
            color={darkMode ? colors.white : colors.black}
          />
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={item => item.currency_code}
            renderItem={({item}) => (
              <CurrencyItem
                currency_name={item.currency_name}
                currency_code={item.currency_code}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
