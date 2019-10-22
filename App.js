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

const httpLink = new HttpLink({ uri: 'http://localhost:4444' })

// const link = new HttpLink({ uri: 'http://localhost:4444' })
const link = httpLink
const cache = new InMemoryCache()
const client = new ApolloClient({
  link,
  cache,
  fetchOptions: {
    credentials: 'include'
  }
})

function App() {
  return (
    <View style={{ flex: 1 }}>
      <ApolloProvider client={client}>
        <Header
          // leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Syllabi', style: { color: '#fff' } }}
          // rightComponent={<Button onPress={removeToken} title="logout" />}
          containerStyle={{
            backgroundColor: '#2f72da'
          }}
        />
        <Navigator />
      </ApolloProvider>
    </View>
  )
}

export default App
