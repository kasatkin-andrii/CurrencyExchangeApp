import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {colors} from '../constants'
import ModalPicker from './ModalPicker'
import {ThemeContext} from '../context/ThemeContext'
import {AppContext} from '../context/AppContext'

interface ChooseCurrencyProps {
  defaultCurrency: string
  type?: string
}

const ChooseCurrency = ({
  defaultCurrency,
  type = 'to',
}: ChooseCurrencyProps) => {
  const {darkMode} = useContext(ThemeContext)
  const {currencyList, setFromCurr, setToCurr} = useContext(AppContext)

  const list = currencyList?.map(({currency_code}) => currency_code)
  const defaultValue = list?.find(item => item === defaultCurrency)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [value, setValue] = useState(defaultValue ? defaultValue : '')

  useEffect(() => {
    type === 'from' ? setFromCurr(value) : setToCurr(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  const changeModalVisibility = (bool: boolean) => setIsModalVisible(bool)

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
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => changeModalVisibility(true)}>
        <Text style={styles.text}>{value}</Text>
        <Icon
          name="keyboard-arrow-down"
          size={22}
          color={darkMode ? colors.white : colors.black}
          style={styles.iconArrow}
        />
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={isModalVisible}
        onRequestClose={() => changeModalVisibility(false)}>
        <ModalPicker
          changeModalVisibility={changeModalVisibility}
          data={list}
          currentValue={value}
          setValue={setValue}
        />
      </Modal>
    </View>
  )
}

export default ChooseCurrency
