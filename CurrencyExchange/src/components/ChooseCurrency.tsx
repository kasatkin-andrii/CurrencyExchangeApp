import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {colors} from '../constants'

interface ChooseCurrencyProps {
  darkMode: boolean
}

const ChooseCurrency = ({darkMode}: ChooseCurrencyProps) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: darkMode ? colors.darkGray : colors.white,
      height: 50,
      width: 120,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
      shadowColor: darkMode ? colors.lightGray : colors.black,
      shadowOffset: {
        height: 10,
        width: 10,
      },
      elevation: 5,
      flexDirection: 'row',
    },
    text: {
      color: darkMode ? colors.white : colors.black,
      marginRight: 10,
      fontSize: 16,
      fontWeight: '600',
    },
    iconArrow: {
      position: 'absolute',
      right: 15,
      top: 14,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>USD</Text>
      <Icon
        name="keyboard-arrow-down"
        size={22}
        color={darkMode ? colors.white : colors.black}
        style={styles.iconArrow}
      />
    </View>
  )
}

export default ChooseCurrency
