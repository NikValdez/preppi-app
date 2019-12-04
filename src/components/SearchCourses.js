import React, { useState } from 'react'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import { Text, View } from 'react-native'
import { SearchBar, ListItem, Card, Icon } from 'react-native-elements'
import AddCourse from './AddCourse'

const ALL_COURSES = gql`
  query ALL_COURSES {
    me {
      id
      institution {
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
        }
      }
    }
  }
`
function SearchCourses() {
  const [search, setSearch] = useState('')
  const { loading, error, data } = useQuery(ALL_COURSES)
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>`Error! ${error.message}`</Text>

  const sortedCourses = data.me.institution.courses.sort(function(a, b) {
    let titleA = a.title.toLowerCase(),
      titleB = b.title.toLowerCase()
    if (titleA < titleB)
      //sort string ascending
      return -1
    if (titleA > titleB) return 1
    return 0 //default return value (no sorting)
  })

  const handleChange = search => {
    setSearch(search)
  }

  return (
    <>
      <SearchBar
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomColor: 'transparent',
          borderTopColor: 'transparent'
        }}
        round
        lightTheme
        name="search"
        placeholder="Search..."
        value={search}
        onChangeText={handleChange}
      />
      {sortedCourses.map(course => (
        <View key={course.id}>
          {(course.title.toLowerCase().includes(search.toLowerCase()) &&
            search.length > 0) ||
          (course.courseCode.toLowerCase().includes(search.toLowerCase()) &&
            search.length > 0) ? (
            <Card>
              <ListItem
                title={course.title}
                rightAvatar={<AddCourse id={course.id} />}
                subtitle={course.courseCode}
                subtitleStyle={{ marginTop: 5 }}
                contentContainerStyle={{
                  borderBottomColor: course.color,
                  borderBottomWidth: 1.5,
                  padding: 10
                }}
              />
            </Card>
          ) : null}
        </View>
      ))}
      {search.length < 1 && (
        <View
          style={{
            marginTop: 100
          }}
        >
          <Icon name="search" type="font-awesome" color="#2f72da" size={200} />
        </View>
      )}
    </>
  )
}

export default SearchCourses
