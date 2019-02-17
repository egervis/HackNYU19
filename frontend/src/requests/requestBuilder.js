import axios from 'axios';

const address = 'http://192.168.99.100';
const port = 3001;

// Register a user
// userType: number
// lastName, firstName, email, password: string
// Returns an axios promise that has no data
export const registerRequester = async (userType, lastName, firstName, email, userPassword) => {
  return await axios.post(`${address}:${port}/register`, {
    userType: userType,
    lastName: lastName,
    firstName: firstName,
    email: email,
    userPassword: userPassword
  })
    .then(res => {
      return res.status;
    })
    .catch(err => {
      console.error('Failed to login', err);
    });
}

// Login a user
// email, userPassword: string
// Returns a user object, empty if user not found
export const loginRequester = async (email, userPassword) => {
  return await axios.post(`${address}:${port}/login`, {
    email: email,
    userPassword: userPassword
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.error('Failed to login', err);
    })
}
