import React, { useState } from 'react'
import {
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import {
  ListItem,
  Divider,
  Card,
  Tooltip,
  Header,
  Button,
  Overlay,
  Icon
} from 'react-native-elements'
import HTML from 'react-native-render-html'
import { gql } from 'apollo-boost'
import { FontAwesome } from '@expo/vector-icons'
import { format } from 'date-fns'
import Signout from '../components/Signout'

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
  const [visible, setVisible] = useState(false)
  const [assignmentVisible, setAssignmentVisible] = useState(false)
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
      <Header
        // leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{
          text: data.course.title,
          style: { color: '#fff', fontSize: 20 }
        }}
        rightComponent={<Signout />}
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate('MyCourses')}>
            <FontAwesome name="arrow-left" size={25} color="#fff" />
          </TouchableOpacity>
        }
        containerStyle={{
          backgroundColor: '#2f72da'
        }}
      />
      <Card
        containerStyle={{
          // backgroundColor: data.course.color,
          marginBottom: 20,
          shadowOpacity: 0.75,
          shadowRadius: 5,
          shadowColor: data.course.color,
          shadowOffset: { height: 0, width: 0 },
          padding: 10
        }}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={{ fontWeight: 'bold' }}>Instructor</Text>
          <Text style={{ marginLeft: 'auto' }}>{data.course.courseCode}</Text>
        </View>
        <Divider style={{ backgroundColor: data.course.color }} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={{ fontWeight: 'bold' }}>Room</Text>
          <Text style={{ marginLeft: 'auto' }}>{data.course.credits}</Text>
        </View>
        <Divider style={{ backgroundColor: data.course.color }} />
        <Text style={{ fontWeight: 'bold' }}>Description</Text>
        {data.course.description.length < 100 ? (
          <HTML html={data.course.description} />
        ) : (
          <>
            <HTML html={data.course.description.substring(0, 100)} />
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon
                raised
                name="ellipsis-h"
                type="font-awesome"
                color="#2f72da"
                size={20}
                onPress={() => setVisible(!visible)}
              />
            </View>
          </>
        )}
      </Card>
      <Overlay
        isVisible={visible}
        windowBackgroundColor="#2f72da"
        overlayBackgroundColor="#fff"
        width="auto"
        height="auto"
        onBackdropPress={() => setVisible(false)}
      >
        <HTML html={data.course.description} />
      </Overlay>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
          marginTop: 20,
          color: '#2f72da'
        }}
      >
        Assignments
      </Text>
      <Divider />
      <ScrollView>
        <FlatList
          data={eventsByDate}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <>
                <ListItem
                  style={{
                    marginBottom: 20,
                    shadowOpacity: 0.5,
                    shadowRadius: 4,
                    shadowColor: '#2E2E2E',
                    shadowOffset: { height: 0, width: 0 }
                  }}
                  roundAvatar
                  title={
                    <View>
                      <Text style={{ textAlign: 'right' }}>
                        {format(new Date(item.end), 'MM/dd/yyyy')}
                      </Text>
                      <Text style={{ textAlign: 'center', fontSize: 18 }}>
                        {item.title}
                      </Text>
                    </View>
                  }
                  subtitle={
                    item.description.length < 100 ? (
                      <HTML html={item.description} />
                    ) : (
                      <>
                        <HTML html={item.description.substring(0, 100)} />
                        <Icon
                          raised
                          name="ellipsis-h"
                          type="font-awesome"
                          color="#2f72da"
                          onPress={() => setVisible(true)}
                          size={12}
                        />
                        <Overlay
                          isVisible={assignmentVisible}
                          windowBackgroundColor="#2f72da"
                          overlayBackgroundColor="#fff"
                          width="auto"
                          height="auto"
                          onBackdropPress={() => setAssignmentVisible(false)}
                        >
                          <HTML html={item.description} />
                        </Overlay>
                        {/* <Tooltip
                          popover={<HTML html={item.description} />}
                          overlayColor="#dbdce1"
                          backgroundColor="transparent"
                          withPointer={false}
                          width={300}
                          height={100}
                        >
                          <FontAwesome
                            style={{ textAlign: 'center' }}
                            name="ellipsis-h"
                            size={30}
                            color="#dbdce1"
                          />
                        </Tooltip> */}
                      </>
                    )
                  }
                  bottomDivider
                />
              </>
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
