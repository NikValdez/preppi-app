import React, { useState } from 'react'
import { Icon, Overlay } from 'react-native-elements'
import { View, Text } from 'react-native'
import SearchCourses from './SearchCourses'

function SearchContainer() {
  const [overlay, setOverlay] = useState(false)

  const handleOverlay = () => {
    setOverlay(true)
  }
  return (
    <View style={{ alignItems: 'flex-end' }}>
      <Icon
        raised
        name="search-plus"
        type="font-awesome"
        color="#2f72da"
        onPress={() => setOverlay(true)}
      />
      {overlay && (
        <Overlay isVisible fullScreen={true}>
          <View>
            <View style={{ alignItems: 'flex-end', marginTop: 25 }}>
              <Icon
                raised
                name="close"
                type="font-awesome"
                color="#2f72da"
                onPress={() => setOverlay(false)}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                textAlign: 'center',
                color: '#2f72da'
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
