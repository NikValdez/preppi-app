import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AuthNav from '../components/AuthNav'
import Navigator from '../components/Navigator'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const ME_QUERY = gql`
  {
    me {
      id
      email
      name
      permissions
      institution {
        id
        name
        logo
      }
    }
  }
`

function IsSignedIn() {
  const { loading, error, data } = useQuery(ME_QUERY)
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>`Error! ${error.message}`</Text>
  console.log(data)
  return (
    <View style={{ flex: 1 }}>
      {data.me !== null ? <Navigator /> : <AuthNav />}
    </View>
  )
}

export default IsSignedIn
