import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-boost'
import { HttpLink } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import Navigator from './src/components/Navigator'
import { setContext } from 'apollo-link-context'
import { getToken, signout } from './src/utils'
import { AsyncStorage } from 'react-native'
import { Header, Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import IsSignedIn from './src/screens/IsSignedIn'

const httpLink = new HttpLink({
  uri: 'http://localhost:4444',
  credentials: 'include'
})

const link = httpLink
const cache = new InMemoryCache()
const client = new ApolloClient({
  link,
  cache
  // Headers: { Cookie: 'test' }
})

function App({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <IsSignedIn />
        {/* <Navigator /> */}
      </ApolloProvider>
    </View>
  )
}

export default App
