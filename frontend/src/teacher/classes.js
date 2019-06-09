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
import { Loader, Button, Form } from 'semantic-ui-react';

export const Dashboard = props => {
  const [isFormOpen, toggleForm] = useState(false);
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  const createClass = () => {
    classCreateRequestor(className, localStorage.getItem('userid'));
    toggleForm(false);
  };

  const createForm = (
    <Form inverted size='big'>
        <Form.Field>
        <Form.Input 
          label='Class Name' 
          placeholder='Please enter a class name'
          onChange = {e => setClassName(e.target.value)}
          width={8}/>
        </Form.Field>
        <Button
          inverted
          size='big'
          type='submit'
          onClick={createClass}
        >
        Submit
        </Button>
        <Button
          inverted
          size='big'
          onClick={() => toggleForm(false)}
        >
        Cancel
        </Button>
    </Form>
  );

  const createButton = (
    <Button
      inverted
      size='big'
      onClick={() => toggleForm(true)}
    >
    Create
    </Button>
  );

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
        <main id="page-wrap" className="w-75">
          <div id="content">
            <h2>Welcome to your dashboard.</h2>
            {isFormOpen ? createForm : createButton}
            {loading ? 
              <Loader>Loader</Loader>
              :
              classes.map(c =>
                <div>{c.classname}</div>
              )
            }
          </div>
        </main>
    </div>
  );
};

export default Dashboard;