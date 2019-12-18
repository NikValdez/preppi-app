import gql from 'graphql-tag'
import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Text, View, Modal, TouchableHighlight } from 'react-native'
import { MY_COURSES_QUERY } from '../screens/MyCourses'
import { Icon, Button, Overlay } from 'react-native-elements'

const ADD_COURSE_MUTATION = gql`
  mutation ADD_COURSE_MUTATION($id: ID!) {
    addCourseToUser(id: $id) {
      id
    }
  }
`

class AddCourse extends Component {
  state = { modalVisible: false }
  render() {
    const { id } = this.props

    return (
      <Mutation
        mutation={ADD_COURSE_MUTATION}
        variables={{
          id
        }}
        refetchQueries={[{ query: MY_COURSES_QUERY }]}
      >
        {(addCourseToUser, { loading, error }) => {
          if (error) return <Text>Already Added Course</Text>
          return (
            <>
              <Icon
                raised
                name="plus"
                type="font-awesome"
                color="#4d53b6"
                size={15}
                onPress={() => {
                  addCourseToUser()
                  this.setState({ modalVisible: true })
                }}
              />
              <Overlay
                animationType="fade"
                transparent={true}
                isVisible={this.state.modalVisible}
                windowBackgroundColor="#4d53b6a6"
                overlayBackgroundColor="#4d53b6"
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    buttonStyle={{
                      backgroundColor: '#fff'
                    }}
                    raised
                    titleStyle={{ color: '#4d53b6', fontWeight: 'bold' }}
                    icon={
                      <Icon name="check-circle" size={20} color="#4d53b6" />
                    }
                    title=" Course Added"
                    onPress={() => {
                      this.setState({
                        modalVisible: !this.state.modalVisible
                      })
                    }}
                  />
                </View>
              </Overlay>
            </>
          )
        }}
      </Mutation>
    )
  }
}

export default AddCourse
