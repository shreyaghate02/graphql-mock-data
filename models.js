import axios from 'axios'

class User {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000' // json-server endpoint
    })
  }

  userList() {
    return this.api.get('/users').then(res => res.data).then(res => res.json())
  }

  personList() {
    return this.api.get('/people').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  leaveList() {
    return this.api.get('/leaves').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  teammemberList() {
    return this.api.get('/teammembers').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  holidayList20() {
    return this.api.get('/holidays2020').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }
  holidayList21() {
    return this.api.get('/holidays2021').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }
}

export default new User();;