import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {colors} from '../constants'

interface CurrencyItemProps {
  darkMode: boolean
  title: string
  abbreviation: string
}

const CurrencyItem = ({darkMode, title, abbreviation}: CurrencyItemProps) => {
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
    },
    itemText: {
      color: darkMode ? colors.white : colors.black,
      fontSize: 18,
      fontWeight: '400',
    },
    itemAbbreviation: {
      color: darkMode ? colors.white : colors.black,
      fontSize: 20,
      fontWeight: '700',
    },
  })

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{title}</Text>
      <Text style={styles.itemAbbreviation}>{abbreviation}</Text>
    </View>
  )
}

export default CurrencyItem
