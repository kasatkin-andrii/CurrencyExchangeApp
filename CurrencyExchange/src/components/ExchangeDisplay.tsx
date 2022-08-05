import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React from 'react'
import RefreshIcon from 'react-native-vector-icons/SimpleLineIcons'
import {colors} from '../constants'

interface ExchangeDisplayProps {
  darkMode: boolean
}

const ExchangeDisplay = ({darkMode}: ExchangeDisplayProps) => {
  const styles = StyleSheet.create({
    exchangeDisplay: {
      flex: 1,
      backgroundColor: darkMode ? colors.darkGray : colors.white,
      marginHorizontal: 20,
      borderRadius: 20,
      shadowColor: darkMode ? colors.lightGray : colors.black,
      shadowOffset: {
        height: 10,
        width: 10,
      },
      elevation: 5,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    text: {
      color: darkMode ? colors.white : colors.black,
      fontSize: 18,
      marginBottom: 10,
    },
    inputContainer: {
      width: '100%',
      backgroundColor: darkMode ? colors.gray : colors.darkWhite,
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 10,
      marginVertical: 5,
    },
    inputTitle: {
      color: colors.blue,
      fontSize: 18,
      fontWeight: '400',
      marginHorizontal: 10,
    },
    input: {
      flex: 1,
      color: darkMode ? colors.white : colors.black,
    },
    changeBtn: {
      backgroundColor: darkMode ? colors.lightGray : colors.white,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      shadowColor: darkMode ? colors.lightGray : colors.black,
      shadowOffset: {
        height: 10,
        width: 10,
      },
      elevation: 5,
    },
    mainCurrencyText: {
      color: darkMode ? colors.white : colors.black,
      marginTop: 10,
      marginLeft: 10,
      fontSize: 14,
      fontWeight: '300',
    },
    resultCurrencyText: {
      color: darkMode ? colors.white : colors.black,
      marginTop: 15,
      marginLeft: 10,
      fontSize: 16,
      fontWeight: '700',
    },
  })

  return (
    <View style={styles.exchangeDisplay}>
      <Text style={styles.text}>Amount</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>USD</Text>
        <TextInput
          placeholder="100"
          placeholderTextColor={darkMode ? colors.white : colors.black}
          style={styles.input}
        />
        <TouchableOpacity style={styles.changeBtn}>
          <RefreshIcon
            name="refresh"
            size={20}
            color={darkMode ? colors.white : colors.blue}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.mainCurrencyText}>100 USD=</Text>
      <Text style={styles.resultCurrencyText}>9.14 Euro</Text>
    </View>
  )
}

export default ExchangeDisplay
