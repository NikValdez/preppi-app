import React, { useState } from 'react'
import {
  Text,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  StyleSheet
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
import Pattern from '../images/pattern.jpg'

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
    <ImageBackground
      style={styles.imgBackground}
      resizeMode="cover"
      source={Pattern}
    >
      <View style={{ flex: 1 }}>
        <Header
          // leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{
            text: data.course.title,
            style: { color: data.course.color, fontSize: 20 }
          }}
          rightComponent={<Signout />}
          leftComponent={
            <TouchableOpacity onPress={() => navigation.navigate('MyCourses')}>
              <FontAwesome name="arrow-left" size={25} color="#fff" />
            </TouchableOpacity>
          }
          containerStyle={{
            backgroundColor: 'transparent'
          }}
        />

        <Card
          containerStyle={{
            // backgroundColor: data.course.color,
            marginBottom: 20,
            shadowOpacity: 0.75,
            shadowRadius: 5,
            shadowColor: '#fff',
            shadowOffset: { height: 0, width: 0 },
            padding: 10,
            backgroundColor: '#4d53b6',
            borderRadius: 5
          }}
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>
              Instructor
            </Text>
            <Text style={{ marginLeft: 'auto', color: 'white' }}>
              {data.course.courseCode}
            </Text>
          </View>
          <Divider style={{ backgroundColor: 'white' }} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={{ fontWeight: 'bold', color: 'white' }}>Room</Text>
            <Text style={{ marginLeft: 'auto', color: 'white' }}>
              {data.course.credits}
            </Text>
          </View>
          <Divider style={{ backgroundColor: 'white' }} />
          <Text style={{ fontWeight: 'bold', color: 'white' }}>
            Description
          </Text>
          {data.course.description.length < 100 ? (
            <HTML
              html={data.course.description}
              baseFontStyle={{ color: 'white' }}
              tagsStyles={{
                em: {
                  color: 'white'
                }
              }}
            />
          ) : (
            <>
              <HTML
                html={data.course.description.substring(0, 100)}
                baseFontStyle={{ color: 'white' }}
                tagsStyles={{
                  em: {
                    color: 'white'
                  }
                }}
              />
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
                  color="#4d53b6"
                  size={20}
                  onPress={() => setVisible(!visible)}
                />
              </View>
            </>
          )}
        </Card>
        <Overlay
          isVisible={visible}
          windowBackgroundColor="#4d53b6a6"
          overlayBackgroundColor="#fff"
          width="auto"
          height="auto"
          onBackdropPress={() => setVisible(false)}
        >
          <HTML
            html={data.course.description}
            baseFontStyle={{ color: 'black' }}
          />
        </Overlay>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            marginTop: 20,
            color: '#fff'
          }}
        >
          Assignments
        </Text>

        <ScrollView>
          <FlatList
            data={eventsByDate}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View style={{ marginRight: 10, marginLeft: 10 }}>
                  <ListItem
                    containerStyle={{
                      marginBottom: 20,
                      shadowOpacity: 0.75,
                      shadowRadius: 5,
                      shadowColor: '#fff',
                      shadowOffset: { height: 0, width: 0 },
                      padding: 10,
                      backgroundColor: '#4d53b6',
                      borderRadius: 5
                    }}
                    roundAvatar
                    title={
                      <View>
                        <Text style={{ textAlign: 'right', color: 'white' }}>
                          {format(new Date(item.end), 'MM/dd/yyyy')}
                        </Text>
                        <Text
                          style={{
                            textAlign: 'center',
                            fontSize: 18,
                            color: 'white'
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                    }
                    subtitle={
                      item.description.length < 100 ? (
                        <HTML
                          html={item.description}
                          baseFontStyle={{ color: 'white' }}
                          tagsStyles={{
                            em: {
                              color: 'white'
                            }
                          }}
                        />
                      ) : (
                        <>
                          <HTML
                            html={item.description.substring(0, 100)}
                            baseFontStyle={{ color: 'white' }}
                            tagsStyles={{
                              em: {
                                color: 'white'
                              }
                            }}
                          />

                          <Icon
                            raised
                            name="ellipsis-h"
                            type="font-awesome"
                            color="#4d53b6"
                            onPress={() => setVisible(true)}
                            size={12}
                          />
                          <Overlay
                            isVisible={assignmentVisible}
                            windowBackgroundColor="#4d53b6a6"
                            overlayBackgroundColor="#fff"
                            width="auto"
                            height="auto"
                            onBackdropPress={() => setAssignmentVisible(false)}
                          >
                            <HTML html={item.description} />
                          </Overlay>
                        </>
                      )
                    }
                    bottomDivider
                  />
                </View>
              )
            }}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

SingleCourse.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  }
})

export default SingleCourse
