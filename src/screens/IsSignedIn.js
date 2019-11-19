import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Navigator from '../components/Navigator'
import Navigator2 from '../components/Navigator2'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Signin from './Signin'
import MyCourses from './MyCourses'

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
      {data.me !== null ? <Navigator2 /> : <Navigator />}
    </View>
  )
}

export default IsSignedIn
