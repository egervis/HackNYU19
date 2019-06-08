import '../styles/teacherClasses.css';

import React, {
  useState,
  useEffect
} from 'react';

import BurgerMenu from '../components/Burger';
import {
  classCreateRequestor,
  getClassRequestor
} from '../requests/requestBuilder';
import { Loader } from 'semantic-ui-react';

export const Dashboard = props => {
  const [isFormOpen, toggleForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    setLoading(true);
    getClassRequestor(localStorage.getItem('userid'))
      .then(response => {
        // Sets the state to the data from the classes endpoint (class[])
        setClasses(response.data);
        setLoading(false);
      }).catch(error => {
        // Error handler
        setLoading(false);
        console.error(error);
      });
  }, []);

  return(
    <div>
      <BurgerMenu />
      {loading ? 
        <Loader>Loader</Loader>
        :
        classes.map(c =>
          <div>{c.classname}</div>
        )
      }
    </div>
  );
};

export default Dashboard;