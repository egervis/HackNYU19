import React, {Component} from 'react';
import BurgerMenu from '../components/Burger';
import {Button} from 'semantic-ui-react';
import '../styles/dashboard.css';
import {getClassRequestor} from '../requests/requestBuilder';

const fetchClasses = async () => {
  const classes = getClassRequestor(
    localStorage.getItem('userid'),
    localStorage.getItem('usertype'),
  )
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error(err);
    });
  return classes;
};

class StudentClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isFormOpen: false,
    };
    this.classEntries = this.classEntries.bind(this);
  }

  async classEntries(classes) {
    await classes;
    const list = classes.data.map(c => <li id={c.classid}>{c.classname}</li>);
    return <ul> {list} </ul>;
  }

  render() {
    // const classes = fetchClasses().data;
    // let ele = classes === undefined ? "You currently don't have any classes." : "You have classes.";

    const name =
      localStorage.getItem('firstname') +
      ' ' +
      localStorage.getItem('lastname');

    return (
      <div id="teacher-classes">
        <BurgerMenu usertype="student" />
        <main id="page-wrap" className="w-75">
          <div id="content">
            <h2>Your Classes</h2>
            <h4> {name}</h4>
          </div>
        </main>
      </div>
    );
  }
}
export default StudentClass;
