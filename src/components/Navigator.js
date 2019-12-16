import React from 'react'
import MyCourses from '../screens/MyCourses'
import Signin from '../screens/Signin'
import SingleCourse from '../screens/SingleCourse'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import MyCalendar from '../screens/MyCalendar'
import { FontAwesome } from '@expo/vector-icons'

const Stack = createStackNavigator(
  {
    Home: Signin,
    SingleCourse: SingleCourse,
    Signin: Signin
  },

  {
    initialRouteName: 'Home'
  }
)

const Navigator = createBottomTabNavigator(
  {
    MyCourses: {
      screen: MyCourses,
      navigationOptions: {
        tabBarLabel: 'MyCourses',
        tabBarIcon: <FontAwesome name="user" size={30} color="#fff" />
      }
    },
    MyCalendar: {
      screen: MyCalendar,
      navigationOptions: {
        tabBarLabel: 'My Calendar',
        tabBarIcon: <FontAwesome name="calendar" size={27} color="#fff" />
      }
    },
    Home: {
      screen: Stack,
      navigationOptions: {
        tabBarVisible: false,
        tabBarOnPress: () => {}
      }
    }

    // initialRouteName: 'MyCourses'
  },

  {
    tabBarOptions: {
      showLabel: false,
      labelStyle: {
        color: '#fff',
        marginBottom: -10
      },
      style: {
        backgroundColor: 'transparent'
      }
    }
  }
)

export default createAppContainer(Navigator)
