import React from 'react'
import Courses from '../screens/Courses'
import MyCourses from '../screens/MyCourses'
import Signin from '../screens/Signin'
import SingleCourse from '../screens/SingleCourse'
import Me from '../screens/Me'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import MyCalendar from '../screens/MyCalendar'
import { FontAwesome } from '@expo/vector-icons'

const stack = createStackNavigator(
  {
    Home: Signin,

    Signin: Signin,
    Courses: Courses,
    MyCourses: MyCourses,
    SingleCourse: SingleCourse,
    MyCalendar: MyCalendar
  },

  {
    initialRouteName: 'Home'
  }
)

const Navigator = createBottomTabNavigator(
  {
    Home: {
      screen: stack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: <FontAwesome name="home" size={30} color="#fff" />
      }
    },
    MyCourses: {
      screen: MyCourses,
      navigationOptions: {
        tabBarLabel: 'My Courses',
        tabBarIcon: <FontAwesome name="user" size={30} color="#fff" />
      }
    },
    MyCalendar: {
      screen: MyCalendar,
      navigationOptions: {
        tabBarLabel: 'My Calendar',
        tabBarIcon: <FontAwesome name="calendar" size={27} color="#fff" />
      }
    }
  },
  {
    tabBarOptions: {
      labelStyle: {
        color: '#fff',
        marginBottom: -10
      },
      style: {
        backgroundColor: '#2f72da'
      }
    }
  }
)

export default createAppContainer(Navigator)
