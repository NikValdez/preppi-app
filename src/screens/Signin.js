import { Text, Button, Input, Card } from 'react-native-elements'
import { StyleSheet, View, Image, ImageBackground } from 'react-native'
import Spacer from '../components/Spacer'
import { login } from '../utils'
import { gql } from 'apollo-boost'
import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { withNavigation } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import Syllabi from '../images/syllabi.png'
import { MY_COURSES_QUERY } from './MyCourses'
import Pattern from '../images/pattern.jpg'

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
    email: 'nikcochran@gmail.com',
    password: 'password'
  }

  submitForm = async () => {
    // e.preventDefault()
    const response = await this.props.mutate({
      variables: this.state,
      awaitRefetchQueries: true,

      refetchQueries: () => [{ query: MY_COURSES_QUERY }]
    })

    await this.props.navigation.navigate('MyCourses')

    // const { payload, error } = response.data.signin
    // console.log(response.data.signin.id)

    // await login(response.data.signin.id)

    // this.setState({ email: '', password: '' })
    // this.props.navigation.navigate('MyCourses')
  }

  render() {
    return (
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={Pattern}
      >
        <View style={styles.container}>
          <Image
            source={Syllabi}
            style={{
              width: 50,
              height: 50
            }}
          />
          <Card
            containerStyle={{
              width: '90%',

              shadowOpacity: 0.5,
              shadowRadius: 4,
              shadowColor: '#2E2E2E',
              shadowOffset: { height: 0, width: 0 },
              backgroundColor: '#4d53b6',
              borderRadius: 5
            }}
          >
            <Text style={styles.title}>Sign in</Text>
            <Input
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              placeholder={'Email'}
              inputStyle={styles.input}
            />
            <Spacer />
            <Input
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              placeholder={'Password'}
              secureTextEntry={true}
              inputStyle={styles.input}
            />
            <Spacer />
            <Button
              buttonStyle={{ backgroundColor: 'white' }}
              titleStyle={{
                color: '#4d53b6',
                marginRight: 10,
                fontWeight: 'bold'
              }}
              raised
              title="Sign in"
              onPress={this.submitForm}
              style={styles.button}
              icon={
                <FontAwesome
                  size={30}
                  name="arrow-circle-right"
                  color="#4d53b6"
                />
              }
              iconRight
            />
          </Card>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgBackground: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  input: {
    width: 350,
    padding: 10,
    backgroundColor: 'white'
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  }
})

Signin.navigationOptions = {
  header: null
}

export default graphql(SIGNIN_MUTATION)(withNavigation(Signin))
