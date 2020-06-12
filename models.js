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
  addleaveList() {
    return this.api.get('/leave').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }
  teammemberList() {
    return this.api.get('/teammembers').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  // getHoliday() {
  //   return this.api.get(`/holiday`).then(res => res.data)
  //   .then(res => res)
  //   .catch(err => console.log(err));
  // }
  getHoliday() {
    return this.api.get('/holidays').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }


  async createLeave(data) {
    console.log(data);
    const data1 = await this.api.post('/leave', data.input);
    console.log(data1);
    if (data1.status === 201 || data.status === 200){
        return {
            msg: "Leave added successfuly!"
        }
    }
    return {
        error: "Something went wrong!"
    }
  }

  async createHoliday(data) {
    console.log(data);
    const data1 = await this.api.post('/holidays', data.input);
    console.log(data1);
    if (data1.status === 201 || data.status === 200){
        return {
            msg: "Holiday added successfuly!",
            data: data1.data
        }
    }
    return {
        error: "Something went wrong!"
    }
  }
}

export default new User();;