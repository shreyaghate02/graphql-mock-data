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

type Holiday {
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

type HolidayData {
    id: ID!
    data: [Holiday]
}
type AddLeave {
    name: String
    reason: String
    date: String
}
input CreateLeave {
    name: String
    reason: String
    date: String
}
input HolidayInput {
    name: String
    date: String
    year: String
    isholidayforallteams: String
    teams: [String]
}
input CreateHolidayInput {
    id: ID!
    data: [HolidayInput]
}
type CreatedMsg {
    msg: String
}

type Query {
    users: [User],
    persons: [Person],
    leaves: [Leave],
    leave: [AddLeave],
    teams: [Teams],
    teammembers: [TeamMembers],
    holiday(id: ID!): HolidayData
}
type Mutation {
    createLeave(input: CreateLeave): CreatedMsg
    createHoliday(input: CreateHolidayInput): CreatedMsg
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
    leave: () => {
        return userModel.addleaveList()
    },
    teammembers: () => {
        return userModel.teammemberList()
    },
    holiday(source, args) {
        console.log(args);
        return userModel.getHoliday(args)
    }
  },
  Mutation: {
    createLeave(source, args) {
      console.log(args);
      return userModel.createLeave(args)
    },
    createHoliday(source, args) {
        console.log(args);
        return userModel.createHoliday(args)
      },
  }
}