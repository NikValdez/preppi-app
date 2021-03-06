import React, { useState } from 'react'
import { Icon, Overlay } from 'react-native-elements'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'
import SearchCourses from './SearchCourses'
import Pattern from '../images/pattern.jpg'

function SearchContainer() {
  const [overlay, setOverlay] = useState(false)

  return (
    <View style={{ alignItems: 'flex-end' }}>
      <Icon
        containerStyle={{ marginTop: 20 }}
        raised
        name="search-plus"
        type="font-awesome"
        color="#4d53b6"
        onPress={() => setOverlay(true)}
      />
      {overlay && (
        <Overlay isVisible fullScreen={true} overlayBackgroundColor="#edeced69">
          <View>
            <View style={{ alignItems: 'flex-end', marginTop: 25 }}>
              <Icon
                raised
                name="close"
                type="font-awesome"
                color="#4d53b6"
                onPress={() => setOverlay(false)}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                textAlign: 'center',
                color: '#4d53b6'
              }}
            >
              Search Courses
            </Text>
            <SearchCourses />
          </View>
        </Overlay>
      )}
    </View>
  )
}

export default SearchContainer
