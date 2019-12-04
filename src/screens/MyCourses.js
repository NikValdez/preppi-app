import React from 'react'
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Header, PricingCard } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import Signout from '../components/Signout'
import DeleteMyCourse from '../components/DeleteMyCourse'
import SearchContainer from '../components/SearchContainer'

const MY_COURSES_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      myCourses {
        id
        courses {
          id
          title
          description
          credits
          courseCode
          color
        }
      }
    }
  }
`

function MyCourses({ navigation }) {
  const { loading, error, data } = useQuery(MY_COURSES_QUERY)
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>`Error! ${error.message}`</Text>

  const courseData = data.me.myCourses.map(course => course)

  return (
    <View>
      <Header
        centerComponent={{
          text: 'My Courses',
          style: { color: '#fff', fontSize: 20 }
        }}
        rightComponent={<Signout />}
        containerStyle={{
          backgroundColor: '#2f72da'
        }}
      />
      {/* <Text h1 style={styles.title}>
        <FontAwesome name="user" size={40} color="#2f72da" />{' '}
      </Text> */}
      <SearchContainer />
      <FlatList
        numColumns={2}
        data={courseData}
        keyExtractor={item => item.courses.id}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SingleCourse', { id: item.courses.id })
                }
              >
                <View
                  style={{
                    alignItems: 'flex-end',
                    marginBottom: -20,
                    marginTop: 20
                  }}
                >
                  <DeleteMyCourse id={item.id} />
                </View>
                <PricingCard
                  containerStyle={{ maxWidth: 160, minWidth: 150 }}
                  color={item.courses.color}
                  title={item.courses.title}
                  info={[item.courses.courseCode]}
                  button={{
                    title: ' Details',
                    icon: 'list',
                    titleStyle: { fontSize: 15 }
                  }}
                  onButtonPress={() =>
                    navigation.navigate('SingleCourse', { id: item.courses.id })
                  }
                  titleStyle={{
                    fontSize: 20
                  }}
                />
              </TouchableOpacity>
            </>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  title: {
    textAlign: 'center',
    margin: 20,
    fontSize: 20
  }
})

MyCourses.navigationOptions = {
  header: null
}

export default MyCourses
export { MY_COURSES_QUERY }
