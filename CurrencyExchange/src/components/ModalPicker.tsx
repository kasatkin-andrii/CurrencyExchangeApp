import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, {Dispatch, SetStateAction, useContext} from 'react'
import {colors} from '../constants'
import {ThemeContext} from '../context/ThemeContext'
import Icon from 'react-native-vector-icons/MaterialIcons'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

interface ModalPickerProps {
  changeModalVisibility: (bool: boolean) => void
  data: string[] | undefined
  currentValue: string
  setValue: Dispatch<SetStateAction<string>>
}

const ModalPicker = ({
  changeModalVisibility,
  data,
  currentValue,
  setValue,
}: ModalPickerProps) => {
  const {darkMode} = useContext(ThemeContext)

  const initialScrollIndex = data?.indexOf(currentValue)

  const onPressItem = (option: string) => {
    setValue(option)
    changeModalVisibility(false)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: darkMode ? colors.gray : colors.white,
      borderRadius: 10,
      shadowColor: darkMode ? colors.lightGray : colors.black,
      shadowOffset: {
        height: 10,
        width: 10,
      },
      elevation: 5,
    },
    option: {
      alignItems: 'flex-start',
    },
    text: {
      marginHorizontal: 20,
      fontSize: 18,
      fontWeight: 'bold',
      color: darkMode ? colors.white : colors.black,
    },
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
      height: 50,
      paddingHorizontal: 30,
      alignItems: 'center',
    },
    icon: {
      position: 'absolute',
      right: 30,
    },
  })

  const renderOption = (item: string) => (
    <TouchableOpacity style={styles.option} onPress={() => onPressItem(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{item}</Text>
        {currentValue === item ? (
          <Icon name="done" size={34} color={colors.blue} style={styles.icon} />
        ) : null}
      </View>
    </TouchableOpacity>
  )

  return (
    <TouchableOpacity
      onPress={() => changeModalVisibility(false)}
      style={styles.container}>
      <View style={[styles.modal, {width: WIDTH - 180, height: HEIGHT / 2}]}>
        {initialScrollIndex ? (
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => renderOption(item)}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={initialScrollIndex}
            getItemLayout={(_, index) => ({
              length: 50,
              offset: 50 * index,
              index,
            })}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

export default ModalPicker
