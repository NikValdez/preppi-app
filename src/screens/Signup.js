import { Text, Button, Input, Card } from 'react-native-elements'
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Picker,
  Alert
} from 'react-native'
import Spacer from '../components/Spacer'
import { login } from '../utils'
import { gql } from 'apollo-boost'
import React, { Component } from 'react'
import { graphql, Query } from 'react-apollo'
import { withNavigation } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import Syllabi from '../images/syllabi.png'
import { MY_COURSES_QUERY } from './MyCourses'
import Pattern from '../images/pattern.jpg'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
    $institution: ID
  ) {
    signup(
      email: $email
      name: $name
      password: $password
      institution: $institution
    ) {
      id
      email
      name
      institution {
        id
        name
      }
    }
  }
`

const INSTITUTIONS_QUERY = gql`
  query INSTITUTIONS_QUERY {
    institutions {
      id
      name
      verificationCode
    }
  }
`
const INSTITUTION_QUERY = gql`
  query INSTITUTION_QUERY($id: ID!) {
    institution(where: { id: $id }) {
      id
      name
      verificationCode
    }
  }
`

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    institution: '',
    verificationCode: '',
    verify: '',
    confirmPassword: ''
  }

  submitForm = async () => {
    await this.verifyCode()
    // e.preventDefault()
    const response = await this.props.mutate({
      variables: this.state,
      awaitRefetchQueries: true,

      refetchQueries: () => [{ query: MY_COURSES_QUERY }]
    })

    await this.props.navigation.navigate('MyCourses')
  }

  handleVerify = (e, verification) => {
    if (verification) {
      this.setState({
        verificationCode: e.target.value.toLowerCase(),
        verify: verification
      })
    }
  }

  verifyCode = () => {
    if (this.state.verificationCode !== this.state.verify) {
      this.setState({ verificationCode: '' })
      Alert.alert('Incorrect Verification Code')
      throw new Error('Incorrect Verification Code')
    } else {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({ confirmPassword: '' })
        Alert.alert('Passwords do not match')
        throw new Error('Passwords do not match')
      }
    }
  }

  render() {
    return (
      <ImageBackground
        style={styles.imgBackground}
        resizeMode="cover"
        source={Pattern}
      >
        <View style={styles.container}>
          {/* <Image
            source={Syllabi}
            style={{
              width: 50,
              height: 50
            }}
          /> */}
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
            <Button
              containerStyle={{ alignSelf: 'flex-end' }}
              titleStyle={{ color: 'white' }}
              type="clear"
              title="Sign in"
              onPress={() => this.props.navigation.navigate('Signin')}
            />
            <Text style={styles.title}>Sign up</Text>
            <Query query={INSTITUTIONS_QUERY}>
              {({ data, error, loading }) => {
                if (loading) return <Text>Loading...</Text>
                if (error) return <Text>Error : {error.message}</Text>
                return (
                  <View style={{ height: 200, marginBottom: 20 }}>
                    <Picker
                      ItemStyle={{ width: 100 }}
                      selectedValue={this.state.institution}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({ institution: itemValue })
                      }
                    >
                      <Picker.Item label="Select School" />
                      {data.institutions.map(institution => (
                        <Picker.Item
                          key={institution.id}
                          label={institution.name}
                          value={institution.id}
                          color="white"
                        />
                      ))}
                    </Picker>
                  </View>
                )
              }}
            </Query>
            {this.state.institution ? (
              <Query
                query={INSTITUTION_QUERY}
                variables={{
                  id: this.state.institution
                }}
              >
                {({ data, error, loading }) => {
                  if (loading) return <Text>Loading...</Text>
                  if (error) return <Text>Error : {error.message}</Text>

                  return (
                    <View>
                      <Input
                        inputStyle={styles.input}
                        name="verificationCode"
                        placeholder="Verification Code"
                        value={this.state.verificationCode}
                        onChangeText={verificationCode =>
                          this.setState({
                            verificationCode: verificationCode.toLowerCase(),
                            verify: data.institution.verificationCode
                          })
                        }
                      />
                    </View>
                  )
                }}
              </Query>
            ) : null}
            <Spacer />

            <Input
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
              placeholder={'Name'}
              inputStyle={styles.input}
            />
            <Spacer />
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
            <Input
              value={this.state.confirmPassword}
              onChangeText={confirmPassword =>
                this.setState({ confirmPassword })
              }
              placeholder={'Confirm Password'}
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
              title="Sign up"
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
    backgroundColor: 'white',
    borderRadius: 5
  },
  title: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20
  }
})

Signup.navigationOptions = {
  header: null
}

export default graphql(SIGNUP_MUTATION)(withNavigation(Signup))
