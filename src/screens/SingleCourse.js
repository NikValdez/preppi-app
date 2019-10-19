import React, { useState } from 'react'
import { Text, View, FlatList, ScrollView, Dimensions } from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { ListItem, Divider } from 'react-native-elements'
import { getToken } from '../../src/utils'
import HTML from 'react-native-render-html'
import { gql } from 'apollo-boost'

const SINGLE_COURSE_QUERY = gql`
  query SINGLE_COURSE_QUERY($id: ID!) {
    course(where: { id: $id }) {
      id
      title
      description
      courseCode
      credits
      color
      startDate
      endDate
      days
      user {
        id
      }
      events {
        id
        title
        description
        start
        end
        upload
        color
      }
      myCourse {
        user {
          email
        }
      }
      announcements {
        id
        text
        date
      }
    }
  }
`

function SingleCourse({ navigation }) {
  const { loading, error, data } = useQuery(SINGLE_COURSE_QUERY, {
    variables: { id: navigation.getParam('id') }
  })
  if (loading) return <Text>Loading ...</Text>
  if (error) return <Text>`Error! ${error.message}`</Text>

  const course = data.course
  //sort events by date
  const eventsByDate = course.events.sort(function(a, b) {
    return new Date(a.end) - new Date(b.end)
  })

  return (
    <View>
      <Text>Course Title: {data.course.title}</Text>
      <Text>Instructor: {data.course.courseCode}</Text>
      <Text>Room: {data.course.credits}</Text>
      <Text>Description:</Text>
      <HTML html={data.course.description} />
      <Divider />
      <Text>Assignments:</Text>
      <ScrollView>
        <FlatList
          data={eventsByDate}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <ListItem
                roundAvatar
                title={item.title}
                subtitle={<HTML html={item.description} />}
                bottomDivider
              />
            )
          }}
        />
      </ScrollView>
    </View>
  )
}

SingleCourse.navigationOptions = {
  header: null
}

export default SingleCourse
