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
              color="#2f72da"
              onPress={() => this.setState({ isVisible: true })}
              size={12}
            />
            <Overlay isVisible={this.state.isVisible}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Button
                  title="Remove Course"
                  icon={<Icon name="delete" size={20} color="white" />}
                  onPress={() => deleteMyCourse()}
                />
                <Spacer />

                <Button
                  title=" Cancel"
                  icon={<Icon name="cancel" size={20} color="white" />}
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

// Alert.alert(
//   'Remove Course From List',
//   '',
//   [
//     { text: 'NO', onPress: () => null },
//     { text: 'YES', onPress: () => deleteMyCourse() }
//   ],
//   { cancelable: true }
// )
