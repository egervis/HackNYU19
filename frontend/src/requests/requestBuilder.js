import axios from 'axios';

const address = 'http://192.168.99.100';
const port = 3001;

// Register a user
// userType: number
// lastName, firstName, email, password: string
// Returns an object with a status field
export const registerRequester = async (userType, lastName, firstName, email, userPassword) => {
  try {
    return axios.post(`${address}:${port}/register`, {
      userType: userType,
      lastName: lastName,
      firstName: firstName,
      email: email,
      userPassword: userPassword
    });
  } catch (error) {
    console.error(error);
  }

}

// Login a user
// email, userPassword: string
// Returns a user object, empty if user not found
export const loginRequester = async (email, userPassword) => {
  try {
    return axios.post(`${address}:${port}/login`, {
      email: email,
      userPassword: userPassword
    });
  } catch (error) {
    console.error(error);
  }
};

// Create a class
// className, instructorID: string
// Returns a user object, with classCode
export const classCreateRequestor = async (className, instructorID) => {
  try {
    return axios.post(`${address}:${port}/class/create`, {
      className: className,
      instructorID: instructorID
    });
  } catch (error) {
    console.error(error);
  }
};
