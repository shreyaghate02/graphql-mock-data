import { gql } from 'apollo-server-express'
import userModel from './models'

export const typeDefs = gql`
type User {
    id: ID
    name: String
    age: Int
    email: String
    friends: [User]
}
type Person {
    name: String
    firstname: String
    address: String,
    companyName: String
    image: String
}
type Leave {
    name: String
    image: String
    badgeName: String
    count: Int
    from: String
    to: String
    reason: String
    badgename1: String
    approvername: String
    apshort: String
    org: String 
}

type Query {
    users: [User],
    persons: [Person],
    leaves: [Leave]
}
`

export const resolvers = {
  Query: {
    users() {
        return userModel.userList()
    },
    persons: () => {
        return userModel.personList()
    },
    leaves: () => {
        return userModel.leaveList()
    },
  }
}