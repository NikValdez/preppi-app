import React, { useState } from 'react'
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Header, Button, ListItem, Card, Tooltip } from 'react-native-elements'
import { getToken, signout } from '../utils'
import { NavigationEvents } from 'react-navigation'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { format } from 'date-fns'
import HTML from 'react-native-render-html'

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
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY_COURSES_EVENTS)
  const [isVisible, setIsVisible] = useState(false)
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>`Error! ${error.message}`</Text>
  const courseData = data.me.myCourses.map(course => course.courses)
  const eventData = courseData.map(course => course.events)
  const calEvents = [].concat.apply([], eventData)

  const events = () => {
    const obj = {}
    for (const key of calEvents) {
      obj[format(new Date(key.end), 'yyyy-MM-dd')] = [
        { title: key.title, description: key.description }
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
      <Agenda
        // the list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key kas to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={events()}
        // callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={month => {
          console.log('trigger items loading')
        }}
        // callback that fires when the calendar is opened or closed
        onCalendarToggled={calendarOpened => {
          console.log(calendarOpened)
        }}
        // callback that gets called on day press
        // onDayPress={day => {
        //   console.log('day pressed')
        // }}
        // callback that gets called when day changes while scrolling agenda list
        // onDayChange={day => {
        //   console.log('day changed')
        // }}
        // initially selected day
        selected={new Date()}
        renderItem={(item, firstItemInDay) => {
          return (
            <>
              <Tooltip
                height={60}
                width={320}
                withOverlay
                containerStyle={styles.tooltip}
                pointerColor={'transparent'}
                popover={<HTML html={item.description} />}
              >
                <Card>
                  <Text>{item.title}</Text>
                </Card>
              </Tooltip>
            </>
          )
        }}
        // specify how each date should be rendered. day can be undefined if the item is not first in that day.
        renderDay={(day, item) => {
          return <View />
        }}
        // specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return <View />
        }}
        // specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return <Text>Nothing for this date</Text>
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
          // ...calendarTheme,
          agendaDayTextColor: 'yellow',
          agendaDayNumColor: 'green',
          agendaTodayColor: 'red'
          // agendaKnobColor: 'blue'
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tooltip: {
    backgroundColor: 'transparent',
    width: 300,
    marginTop: 35
  }
})

Calendar.navigationOptions = {
  header: null
}

export default MyCalendar
