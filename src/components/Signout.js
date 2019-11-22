import React from 'react'
import { withNavigation } from 'react-navigation'
import { Text, TouchableOpacity } from 'react-native'
import RCTNetworking from 'RCTNetworking'

function Signout({ navigation }) {
  const clearCookies = () => {
    RCTNetworking.clearCookies(cleared => {
      console.log(cleared)
    })
    navigation.navigate('Home')
  }
  return (
    <TouchableOpacity>
      <Text style={{ color: '#fff' }} onPress={clearCookies}>
        Logout
      </Text>
    </TouchableOpacity>
  )
}

export default withNavigation(Signout)
