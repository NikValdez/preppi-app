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

const Navigator = createBottomTabNavigator({
  Home: stack,
  MyCourses: MyCourses,
  MyCalendar: MyCalendar
})

export default createAppContainer(Navigator)
