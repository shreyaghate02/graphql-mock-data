import axios from 'axios'

class User {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:3000' // json-server endpoint
    })
  }

  employeeList() {
    return this.api.get('/employee').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  teammembersList() {
    return this.api.get('/teammembers').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  leaveList() {
    return this.api.get('/leaves').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  getHoliday() {
    return this.api.get('/holidays').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  year() {
    return this.api.get('/importforyear').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  getHolidaysfor2020() {
    return this.api.get('/importholidays2020').then(res => res.data)
    .then(res => res)
    .catch(err => console.log(err));
  }

  getHolidaysfor2021() {
    return this.api.get('/importholidays2021').then(res => res.data)
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
    const t = `${data.teams}`;
    const team = t.split(',');
    const data1 = await this.api.post('/holidays', {
      name: data.name,
      date: data.date,
      day: data.day,
      year: data.year,
      ismultidayholiday: data.ismultidayholiday,
      isholidayforallteams: data.isholidayforallteams,
      startDate: data.startDate,
      endDate: data.endDate,
      orgid: data.orgid,
      teams: team
    });
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

async createImportHoliday(data) {
  console.log(data);
  const t = `${data.teams}`;
  const team = t.split(',');
  const data1 = await this.api.post('/holidays', {
    name: data.name,
    date: data.date,
    day: data.day,
    year: data.year,
    isholidayforallteams: data.isholidayforallteams,
    orgid: data.orgid,
    teams: team
  });
  console.log(data1);
  if (data1.status === 201 || data.status === 200){
      return {
          msg: "Holiday imported successfuly!",
          data: data1.data
      }
  }
  return {
      error: "Something went wrong!"
  }
}

async deleteHoliday(args) {
  const data = await this.api.delete(`/holidays/${args.id}`);
  console.log(data);
  if (data.status === 200) {
      return {
          msg: 'Holiday deleted successfuly!',
      };
  }
  return {
      msg: 'Something went wrong!',
  };
}

async updateHoliday(args) {
  console.log(args);
  const t = `${args.teams}`;
  const team = t.split(',');
  const data = await this.api.put(`/holidays/${args.id}`, {
      id: args.id,
      name: args.name,
      date: args.date,
      day: args.day,
      year: args.year,
      ismultidayholiday: args.ismultidayholiday,
      isholidayforallteams: args.isholidayforallteams,
      startDate: args.startDate,
      endDate: args.endDate,
      orgid: args.orgid,
      teams: team
  });
  console.log(data);
  if (data.status === 200) {
      return {
          msg: 'Holiday updated successfuly!',
      };
  }
  return {
      msg: 'Something went wrong!',
  };
}

}

export default new User();