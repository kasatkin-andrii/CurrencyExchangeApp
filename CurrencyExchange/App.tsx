import React, {useState} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ExchangeIcon from 'react-native-vector-icons/FontAwesome5'

import {colors} from './src/constants'
import ChooseCurrency from './src/components/ChooseCurrency'
import ExchangeDisplay from './src/components/ExchangeDisplay'
import CurrencyItem from './src/components/CurrencyItem'

const APP_NAME = 'Currency Exchange'

const App = () => {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => setDarkMode(!darkMode)

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
  })

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.appName}>{APP_NAME}</Text>
        <TouchableOpacity
          style={styles.darkModeIconContainer}
          onPress={toggleDarkMode}>
          <Icon
            name={darkMode ? 'wb-sunny' : 'nightlight-round'}
            size={35}
            color={darkMode ? colors.white : colors.black}
            style={styles.darkModeIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.currencyContainer}>
        <ChooseCurrency darkMode={darkMode} />
        <TouchableOpacity>
          <ExchangeIcon name="exchange-alt" size={20} color={colors.blue} />
        </TouchableOpacity>
        <ChooseCurrency darkMode={darkMode} />
      </View>
      <View style={styles.exchangeContainer}>
        <ExchangeDisplay darkMode={darkMode} />
      </View>
      <View style={styles.listCurrency}>
        <CurrencyItem
          darkMode={darkMode}
          title="Ukrainian Hryvnia"
          abbreviation="UAH"
        />
      </View>
    </SafeAreaView>
  )
}

export default App
