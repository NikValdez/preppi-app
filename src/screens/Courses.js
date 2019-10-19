import React, { useEffect } from 'react'
import { Text, View, FlatList } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { ListItem } from 'react-native-elements'
import { getToken } from '../../src/utils'
import { gql } from 'apollo-boost'

const ALL_COURSES_QUERY = gql`
  {
    courses {
      id
      title
      description
      courseCode
      credits
      image
      color
    }
  }
`

export default function Courses(props) {
  const { loading, error, data } = useQuery(ALL_COURSES_QUERY)
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>`Error! ${error.message}`</Text>

  return (
    <View>
      <FlatList
        data={data.courses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return <ListItem chevron title={item.title} />
        }}
      />
    </View>
  )
}
