import {StyleSheet, Text, View} from 'react-native'
import React, {useContext} from 'react'
import {colors} from '../constants'
import {ThemeContext} from '../context/ThemeContext'

interface CurrencyItemProps {
  currency_name: string
  currency_code: string
}

const CurrencyItem = ({currency_name, currency_code}: CurrencyItemProps) => {
  const {darkMode} = useContext(ThemeContext)

  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      backgroundColor: darkMode ? colors.darkGray : colors.white,
      shadowColor: darkMode ? colors.lightGray : colors.black,
      shadowOffset: {
        height: 10,
        width: 10,
      },
      elevation: 5,
      borderRadius: 20,
      height: 50,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: 15,
    },
    itemText: {
      color: darkMode ? colors.white : colors.black,
      fontSize: 16,
      fontWeight: '400',
    },
    itemAbbreviation: {
      color: darkMode ? colors.white : colors.black,
      fontSize: 18,
      fontWeight: '700',
    },
    titleContainer: {
      flex: 10,
      height: '100%',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingLeft: 25,
    },
    abbreviationContainer: {
      flex: 2,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 10,
    },
  })

  return (
    <View style={styles.itemContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.itemText}>{currency_name}</Text>
      </View>
      <View style={styles.abbreviationContainer}>
        <Text style={styles.itemAbbreviation}>{currency_code}</Text>
      </View>
    </View>
  )
}

export default CurrencyItem
