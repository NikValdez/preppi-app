import React from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-boost'
import { HttpLink } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import IsSignedIn from './src/screens/IsSignedIn'
import { DEV_ENDPOINT } from 'react-native-dotenv'
import Pattern from './src/images/pattern.jpg'

const httpLink = new HttpLink({
  uri: DEV_ENDPOINT,
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
    <ImageBackground
      style={styles.imgBackground}
      resizeMode="cover"
      source={Pattern}
    >
      <View style={{ flex: 1 }}>
        <ApolloProvider client={client}>
          <IsSignedIn />
        </ApolloProvider>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  }
})

export default App
