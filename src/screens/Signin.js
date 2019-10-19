import { Text, Button, Input } from 'react-native-elements'
import { StyleSheet, View } from 'react-native'
import Spacer from '../components/Spacer'
import { login } from '../utils'
import { gql } from 'apollo-boost'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { withNavigation } from 'react-navigation'
import { AsyncStorage } from 'react-native'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`

class Signin extends Component {
  state = {
    email: '',
    password: ''
  }

  async componentDidMount() {
    try {
      let token = await AsyncStorage.getItem('token')
      if (token != null) {
        console.log(token)
        this.props.navigation.navigate('MyCourses')
      } else {
        this.props.navigation.navigate('Home')
      }
    } catch (error) {
      console.log(error)
    }
  }

  submitForm = async e => {
    e.preventDefault()
    const response = await this.props.mutate({
      variables: this.state
    })
    const { payload, error } = response.data.signin
    // // console.log(response.data.signin.id)
    await login(response.data.signin.id)
    this.setState({ email: '', password: '' })
    this.props.navigation.navigate('MyCourses')
  }

  render() {
    return (
      <View>
        <Spacer />
        <Input
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          placeholder={'Email'}
        />
        <Spacer />
        <Input
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
        />
        <Spacer />
        <Button title="Submit" onPress={this.submitForm} />
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   input: {
//     width: 350,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: 'black',
//     marginBottom: 10
//   }
// })

Signin.navigationOptions = {
  header: null
}

export default graphql(SIGNIN_MUTATION)(withNavigation(Signin))
