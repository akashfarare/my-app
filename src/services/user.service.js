import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getPublicContent1() {
    return axios.get(API_URL + 'all');
  }

  createEmployee(employee) {
    return axios.post(API_URL + 'add',employee);
  }

  getEmployeeById(id) {
    return axios.get(API_URL+ 'byid/'+ id);
  }

  updateEmployee(employee,empid) {
    return axios.put(API_URL + 'update/'+empid,employee);
  }
}

export default new UserService();
