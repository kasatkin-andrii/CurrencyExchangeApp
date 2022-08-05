import React from 'react'
import {SafeAreaView, StyleSheet, Text, View} from 'react-native'

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <View>
        <Text>Hello</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
})

export default App
