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

type TeamMembers {
    Image: String
    Name: String
    RemainingDays: String
    Team: String
    AccountType: String
    Status: String
    org: String
}
type Teams {
    id: String
    teamname: String
}
type Holiday20 {
    id: ID!
    name: String!
    isMultipleHoliday: String
    date: String
    day: String
    start_date: String
    end_date: String
    year: String
    isholidayforallteams: String
    teamname: String
    teams: [Teams]
    org: String
}
type Holiday21 {
    id: ID!
    name: String!
    isMultipleHoliday: String
    date: String
    day: String
    start_date: String
    end_date: String
    year: String
    isholidayforallteams: String
    teamname: String
    teams: [Teams]
    org: String
}
type Holiday {
    id: ID!
    name: String!
    isMultipleHoliday: String
    date: String
    start_date: String
    end_date: String
    year: String
    isholidayforallteams: String
    teamname: String
    teams: [Teams]
  }

type Query {
    users: [User],
    persons: [Person],
    leaves: [Leave],
    teams: [Teams],
    teammembers: [TeamMembers],
    holidays2020: [Holiday20]
    holidays2021: [Holiday21]
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
    teammembers: () => {
        return userModel.teammemberList()
    },
    holidays2020: () => {
        return userModel.holidayList20()
    },
    holidays2021: () => {
        return userModel.holidayList21()
    },
  }
}