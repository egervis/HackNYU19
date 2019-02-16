import axios from 'axios';

const address = '192.168.99.100';
const port = 3000;

// Register a user
// userType: number
// lastName, firstName, email, password: string
// Returns an axios promise that has no data
export const registerRequester = async (userType, lastName, firstName, email, userPassword) => {
  try {
    return await axios.post(`${address}:${port}/register`, {
      userType: userType,
      lastName: lastName,
      firstName: firstName,
      email: email,
      userPassword: userPassword
    });
  } catch (error) {
    console.error('Failed to register user', error);
  }
}

// Login a user
// email, userPassword: string
// Returns a user object, empty if user not found
export const loginUser = async (email, userPassword) => {
  try {
    return await axios.post(`${address}:${port}/login`, {
      email: email,
      userPassword: userPassword
    });
  } catch (error) {
    console.error('Failed to login', error);
  }
}
