import { gql } from 'apollo-server-express'
import userModel from './models'

export const typeDefs = gql`
type Employee {
    employeeId: ID
    employeeType: String
    name: String
    email: String
    password: String
    address: String
    image: String
    availabledaysoffcurrentyear: String
    useddaysoffcurrentyear: String
    totaldaysoffcurrentyear: String
    availabledaysoffnextyear: Float
    useddaysoffnextyear: Float
    totaldaysoffnextyear: Int
    isapprover: String
    team: String
    status: String
    org: String
}
type Label {
    value: String
    label: String
}
type DateLabel {
    value: Int
    label: String
}
type Organization {
  id: ID!
  orgname: String!
  createdEmployees: [Employee]
  holidays: [Holidays]
  workweek: [String]
  leaves: [Leave]
  creator: Employee
  teams: [Team]
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
    orgname: String
    notename: String
    apshort: String
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
type LeaveType {
    id: ID!
    name: String
    type: String
    active: Boolean
    daysPerYear: Int
    approvalRequired: String
    reasonRequired: String
    allowHalfDay: String
}
type Team {
    id: ID!
    name: String!
    createdAt: String
    members: [Employee]
    approvers: [Employee]
    orgname: [Organization]
}
type Holidays {
    id: ID!
    name: String
    isMultipleHoliday: String
    date: String
    day: String
    startDate: String
    endDate: String
    startDay: String
    endDay: String
    year: String
    ismultidayholiday: String
    isholidayforallteams: String
    teams: [String]
    orgid: ID
}

type ImportHolidays20 {
    id: ID!
    name: String             
    date: String
    day: String
    year: String
    isholidayforallteams: String
    teams: [String]
    orgid: ID
    checked: Boolean
}

type ImportHolidays21 {
    id: ID!
    name: String
    date: String
    day: String
    year: String
    isholidayforallteams: String
    teams: [String]
    orgid: ID
    checked: Boolean
}

type YearLabel {
    value: String
    label: String
}

type AddLeave {
    name: String
    reason: String
    date: String
}
input PaidLeaveType {
    id: ID!
    name: String
    active: Boolean
    daysPerYear: Int
    approvalRequired: String
}
input GeneralSettings {
    id: ID!
    org_id: ID!
    dateFormat: String
    transfer: String
    daysExpire: Boolean
    month: String
    date: String
}
input WorkWeeks {
    id: ID!
    org_id: ID
    sunday: Boolean
    monday: Boolean
    tuesday: Boolean
    wednesday: Boolean
    thursday: Boolean
    friday: Boolean
    saturday: Boolean
}
input TeamInput {
    id: ID!
    name: String!
    members: [ID]
    approvers: [ID]
}
input CreateLeave {
    name: String
    leaveType: String
    reason: String
    date: String
    startDate: String
    endDate: String
}
input HolidayInput {
    name: String
    date: String
    year: String
    day: String
    startDate: String
    endDate: String
    startDay: String
    endDay: String
    ismultidayholiday: String
    isholidayforallteams: String
    teams: [String]
    orgid: ID
}
input HolidayEditInput {
    id: ID!
    name: String
    date: String
    year: String
    day: String
    startDate: String
    endDate: String
    startDay: String
    endDay: String
    ismultidayholiday: String
    isholidayforallteams: String
    teams: [String]
    orgid: ID
}
input ImpHolidayInput {
    id: ID
    name: String
    date: String
    day: String
    year: String
    isholidayforallteams: String
    teams: [String]
    orgid: ID
    checked: Boolean
}

type Msg {
    msg: String
}

type Data {
    msg: String
    data: Holidays
}

type Query {
    employees: [Employee]
    leaves: [Leave]
    transferOptions: [Label]
    months: [Label]
    days: [DateLabel]
    dateFormat: [Label]
    teamOptions: [String]
    statusOptions: [Label]
    reportOptions: [Label]
    allcountry: [Label]
    channels: [Label]
    weekdays: [Label]
    getLeave: [LeaveType],
    getPaidLeave: [LeaveType]
    deleteLeave(id: ID!): Msg
    teammembers: [Employee]
    teams: [Team]
    getTeam(id:ID!): Team
    holidays: [Holidays]
    importyear: [YearLabel]
    holidayslist20: [ImportHolidays20]
    holidayslist21: [ImportHolidays21]
    deleteHoliday(id: ID!): Msg
}
type Mutation {
    createLeave(input: CreateLeave): Msg
    updategeneralSettings(input: GeneralSettings): Msg
    updateworkWeek(input: WorkWeeks): Msg
    createHoliday(input: HolidayInput): Data
    createTeam(Team: TeamInput): Team
    createImportHoliday(input: ImpHolidayInput): Data
    updateHoliday(input: HolidayEditInput): Data
}
`

export const resolvers = {
  Query: {
    employees: () => {
        return userModel.employeeList()
    },
    teammembers: () => {
        return userModel.teammembersList()
    },
    leaves: () => {
        return userModel.leaveList()
    },
    holidays: () => {
        return userModel.getHoliday()
    },
    importyear: () => {
        return userModel.year()
    },
    holidayslist20: () => {
        return userModel.getHolidaysfor2020()
    },
    holidayslist21: () => {
        return userModel.getHolidaysfor2021()
    },
    deleteHoliday(source, args) {
        return userModel.deleteHoliday(args);
    },
  },
  Mutation: {
    createLeave(source, args) {
      console.log(args);
      return userModel.createLeave(args)
    },
    createHoliday(source, args) {
        console.log(args);
        return userModel.createHoliday(args.input)
      },
    createImportHoliday(source, args) {
    console.log(args);
    return userModel.createImportHoliday(args.input)
    },
    updateHoliday(source, args) {
        console.log(args);
        return userModel.updateHoliday(args.input);
    },
  }
}