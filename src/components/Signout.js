import React from 'react'
import { Button } from 'react-native-elements'
import { withNavigation } from 'react-navigation'
import { Text, TouchableOpacity } from 'react-native'
var RCTNetworking = require('RCTNetworking')

function Signout({ navigation }) {
  const clearCookies = () => {
    RCTNetworking.clearCookies(cleared => {
      console.log(cleared)
    })
    navigation.navigate('Home')
  }
  return (
    <TouchableOpacity>
      <Text onPress={clearCookies}>Logout</Text>
    </TouchableOpacity>
  )
}

export default withNavigation(Signout)
