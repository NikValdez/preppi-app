import React, { useState } from 'react'
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import {
  Header,
  Button,
  ListItem,
  Card,
  Tooltip,
  Avatar,
  PricingCard,
  Overlay,
  Icon
} from 'react-native-elements'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { format } from 'date-fns'
import HTML from 'react-native-render-html'
import { FontAwesome } from '@expo/vector-icons'
import Signout from '../components/Signout'

const CURRENT_USER_QUERY_COURSES_EVENTS = gql`
  query {
    me {
      id
      email
      name
      institution {
        id
        name
        logo
      }
      permissions
      myCourses {
        id
        courses {
          id
          title
          description
          credits
          courseCode
          period
          color
          days
          startDate
          endDate
          events {
            id
            title
            description
            start
            end
            color
            upload
            course {
              title
            }
          }
          announcements {
            id
            clicked
            text
          }
        }
      }
    }
  }
`

function MyCalendar({ navigation }) {
  const [expand, setExpand] = useState(false)

  const { loading, error, data } = useQuery(CURRENT_USER_QUERY_COURSES_EVENTS)
  if (loading)
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#2f72da" />
      </View>
    )
  if (error) return <Text>`Error! ${error.message}`</Text>
  const courseData = data.me.myCourses.map(course => course.courses)

  const eventData = courseData.map(course => course.events)
  const calEvents = [].concat.apply([], eventData)

  const events = () => {
    const obj = {}
    for (const key of calEvents) {
      obj[format(new Date(key.end), 'yyyy-MM-dd')] = [
        {
          title: key.title,
          description: key.description,
          color: key.color,
          courseTitle: key.course.title,
          end: key.end
        }
      ]
    }
    return obj
  }

  const dates = Object.keys(events()).reduce((acc, key) => {
    acc[key] = { marked: true }
    return acc
  }, {})

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate('MyCourses')}>
            <FontAwesome name="arrow-left" size={25} color="#fff" />
          </TouchableOpacity>
        }
        centerComponent={{
          text: 'Calendar',
          style: { color: '#fff', fontSize: 20 }
        }}
        rightComponent={<Signout />}
        containerStyle={{
          backgroundColor: 'transparent'
        }}
      />
      <Agenda
        // the list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key kas to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={events()}
        // callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={month => {
          // console.log('trigger items loading')
        }}
        // callback that fires when the calendar is opened or closed
        onCalendarToggled={calendarOpened => {
          // console.log(calendarOpened)
        }}
        selected={new Date()}
        renderItem={(item, firstItemInDay) => {
          return <View />
        }}
        // specify how each date should be rendered. day can be undefined if the item is not first in that day.
        renderDay={(day, item) => {
          return (
            <>
              <View style={styles.dateStyle}>
                <Text style={styles.dateNumber}>
                  {format(new Date(item.end), 'dd')}
                </Text>
                <Text style={styles.dateDay}>
                  {format(new Date(item.end), 'EEE')}
                </Text>
              </View>
              <Card
                containerStyle={{
                  width: '80%',
                  marginBottom: 20,
                  shadowOpacity: 0.5,
                  shadowRadius: 4,
                  shadowColor: '#2E2E2E',
                  shadowOffset: { height: 0, width: 0 }
                }}
              >
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  <Avatar
                    rounded
                    title={item.courseTitle[0]}
                    overlayContainerStyle={{ backgroundColor: item.color }}
                    titleStyle={{ color: 'black' }}
                  />
                  <Text style={{ marginLeft: 10 }}>{item.title}</Text>
                </View>
                {item.description.length > 100 && !expand ? (
                  <View>
                    <HTML html={item.description.substring(0, 100)} />

                    <Tooltip
                      containerStyle={{
                        position: 'absolute',
                        top: 200,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                      popover={
                        <View>
                          <HTML html={item.description} />
                        </View>
                      }
                      backgroundColor="transparent"
                      width={300}
                      overlayColor="white"
                    >
                      <Icon
                        raised
                        name="ellipsis-h"
                        type="font-awesome"
                        color="#2f72da"
                        size={12}
                      />
                    </Tooltip>
                  </View>
                ) : (
                  <ScrollView>
                    <HTML html={item.description} />
                  </ScrollView>
                )}
              </Card>
            </>
          )
        }}
        // specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />
        }}
        // specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return (
            <Card
              containerStyle={{
                marginBottom: 20,
                shadowOpacity: 0.5,
                shadowRadius: 4,
                shadowColor: '#2E2E2E',
                shadowOffset: { height: 0, width: 0 }
              }}
            >
              <Text style={{ textAlign: 'center', fontSize: 20 }}>
                No assignments on this date
              </Text>
            </Card>
          )
        }}
        // specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text
        }}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={dates}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
        onRefresh={() => console.log('refreshing...')}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
        refreshControl={null}
        // agenda theme
        theme={{
          selectedDayBackgroundColor: '#2f72da',
          // selectedDayTextColor: '#2f72da',
          dotColor: '#2f72da'
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  tooltip: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    textAlign: 'center',
    top: 10
  },
  tooltipDisplay: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    flexGrow: 1,
    flex: 1
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  dateStyle: {
    margin: 5,
    marginTop: 25
  },
  dateNumber: {
    fontSize: 25,
    color: '#9e9e9ea6'
  },
  dateDay: {
    fontSize: 15,
    color: '#9e9e9ea6'
  }
})

Calendar.navigationOptions = {
  header: null
}

export default MyCalendar
