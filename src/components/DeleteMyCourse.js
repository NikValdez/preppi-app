import gql from 'graphql-tag'
import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { Alert, Text, View } from 'react-native'
import { MY_COURSES_QUERY } from '../screens/MyCourses'
import { Icon, Overlay, Button } from 'react-native-elements'
import Spacer from './Spacer'

const DELETE_MYCOURSE_MUTATION = gql`
  mutation DELETE_MYCOURSE_MUTATION($id: ID!) {
    deleteMyCourse(id: $id) {
      id
    }
  }
`

class DeleteMyCourse extends Component {
  state = { isVisible: false }
  render() {
    return (
      <Mutation
        mutation={DELETE_MYCOURSE_MUTATION}
        variables={{ id: this.props.id }}
        refetchQueries={[{ query: MY_COURSES_QUERY }]}
      >
        {(deleteMyCourse, { error }) => (
          <>
            <Icon
              raised
              name="close"
              type="font-awesome"
              color="#4d53b6"
              onPress={() => this.setState({ isVisible: true })}
              size={12}
            />
            <Overlay
              isVisible={this.state.isVisible}
              windowBackgroundColor="#4d53b6a6"
              overlayBackgroundColor="transparent"
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
                  title="Remove Course"
                  titleStyle={{ color: '#4d53b6', fontWeight: 'bold' }}
                  icon={<Icon name="delete" size={20} color="#4d53b6" />}
                  onPress={() => deleteMyCourse()}
                />
                <Spacer />

                <Button
                  raised
                  buttonStyle={{ backgroundColor: '#fff' }}
                  title=" Cancel"
                  titleStyle={{ color: '#4d53b6', fontWeight: 'bold' }}
                  icon={<Icon name="cancel" size={20} color="#4d53b6" />}
                  onPress={() => this.setState({ isVisible: false })}
                />
              </View>
            </Overlay>
          </>
        )}
      </Mutation>
    )
  }
}

export default DeleteMyCourse
