import React, { useState } from 'react'
import {
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { ListItem, Divider, Card } from 'react-native-elements'
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
  if (loading)
    return (
      <View>
        <ActivityIndicator size="large" color="#2f72da" />
      </View>
    )
  if (error) return <Text>`Error! ${error.message}`</Text>

  const course = data.course
  //sort events by date
  const eventsByDate = course.events.sort(function(a, b) {
    return new Date(a.end) - new Date(b.end)
  })

  return (
    <View style={{ flex: 1 }}>
      <Card
        containerStyle={{ borderColor: data.course.color, marginBottom: 20 }}
      >
        <Text>Course Name: {data.course.title}</Text>
        <Text>Instructor: {data.course.courseCode}</Text>
        <Text>Room: {data.course.credits}</Text>
        <Text>Description:</Text>
        {data.course.description.length < 100 ? (
          <HTML html={data.course.description} />
        ) : (
          <HTML html={data.course.description.substring(0, 100) + '...'} />
        )}
      </Card>

      <Text style={{ textAlign: 'center', fontSize: 18 }}>Assignments</Text>
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
