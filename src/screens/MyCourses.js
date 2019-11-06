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
import { Header, Button, ListItem, Divider, Card } from 'react-native-elements'
import { getToken, signout } from '../utils'
import { NavigationEvents } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'

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

  const removeToken = () => {
    signout()
    props.navigation.navigate('Home')
  }
  const courseData = data.me.myCourses.map(course => course)

  return (
    <View>
      <Header
        // leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{
          text: 'Syllabi',
          style: { color: '#fff', fontSize: 20 }
        }}
        rightComponent={
          <TouchableOpacity>
            <Text style={{ color: '#fff' }}>Logout</Text>
          </TouchableOpacity>
        }
        containerStyle={{
          backgroundColor: '#2f72da'
        }}
      />
      <Text h1 style={styles.title}>
        <FontAwesome name="user" size={40} color="#2f72da" />{' '}
      </Text>
      <FlatList
        data={courseData}
        keyExtractor={item => item.courses.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SingleCourse', { id: item.courses.id })
              }
            >
              <Card containerStyle={{ borderColor: item.courses.color }}>
                <ListItem chevron title={item.courses.title} />
              </Card>
            </TouchableOpacity>
          )
        }}
      />
      {/* <Button onPress={removeToken} title="logout" /> */}
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
