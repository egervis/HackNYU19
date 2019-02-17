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

export const feedbackCreateRequestor = async (instructorID, studentID, feedbackText) => {
  try {
    return axios.post(`${address}:${port}/feedback/create`, {
      instructorID: instructorID,
      studentID: studentID,
      feedbackText: feedbackText
    });
  } catch (error) {
    console.error(error);
  }
};

// Create a class
// className, instructorID: string
// Returns a user object, with classCode
export const getClassRequestor = async (userid, usertype) => {
  try {
    return axios.get(`${address}:${port}/class/get`, {
      params: {
        userid: userid,
        usertype: usertype
      }
    });
  } catch (error) {
    console.error(error);
  }
};

export const getFeedback = async (userid, usertype) => {
  try {
    return axios.get(`${address}:${port}/feedback/get`, {
        userid: userid,
        usertype: usertype
      }
    );
  } catch(error) {
    console.error(error);
  }
}

// Get classes
//
