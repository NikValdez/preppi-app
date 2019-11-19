// import React, { Component } from 'react'
// import { Text, View, FlatList, StyleSheet } from 'react-native'
// import { useQuery } from '@apollo/react-hooks'
// import { gql } from 'apollo-boost'
// import { Header, Button, ListItem } from 'react-native-elements'
// import { Query } from 'react-apollo'
// // import Signout from '../components/Signout'
// import clearCookies from '../components/Signout'

// export const ME_QUERY = gql`
//   {
//     me {
//       id
//       email
//       name
//       permissions
//       institution {
//         id
//         name
//         logo
//       }
//     }
//   }
// `

// class Me extends Component {
//   render() {
//     return (
//       <>
//         <Query query={ME_QUERY}>
//           {({ data }) => {
//             return <Text style={{ fontSize: 30 }}>{JSON.stringify(data)}</Text>
//           }}
//         </Query>
//         {/* <Button title="Logout" onPress={clearCookies} /> */}
//       </>
//     )
//   }
// }

// export default Me
