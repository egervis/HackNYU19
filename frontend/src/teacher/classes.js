import React, { Component } from 'react';
import ReactDOM from "react-dom";
import BurgerMenu from '../components/Burger';
import { Button, Form } from 'semantic-ui-react';
import '../styles/teacherClasses.css';
import { classCreateRequestor, getClassRequestor } from '../requests/requestBuilder'

const fetchClasses = async () => {
  let classes = getClassRequestor(localStorage.getItem('userid'), localStorage.getItem('usertype'))
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error(err);
    });
  return classes;
};

class TeacherClass extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isFormOpen: false
    };
    console.log(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.createClass = this.createClass.bind(this);
    this.classEntries = this.classEntries.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleFormChange() {
    this.setState({
      isFormOpen: !this.state.isFormOpen
    });
  }

  createClass(e) {
    let response = classCreateRequestor(this.state.name, localStorage.getItem('userid'));
    console.log(response);

  }

  async classEntries(classes) {
    await classes;
    const list = classes.data.map(c =>
      <li id={c.classid}>{c.classname}</li>
    );
    return (<ul> {list} </ul>);
  }

  render(){
    const classes = fetchClasses().data;
    let ele = classes === undefined ? "You currently don't have any classes." : "You have classes.";
    
    const name = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
  
    const createForm = (
      <Form inverted size='big'>
        <Form.Field>
          <Form.Input 
            label='Class Name' 
            placeholder='Please enter a class name'
            onChange = {this.handleNameChange}
            width={8}/>
        </Form.Field>
        <Button
          inverted
          size='big'
          type='submit'
          onClick={this.createClass}
        >
        Submit
        </Button>
        <Button
          id="cancel-btn"
          inverted
          size='big'
          onClick={this.handleFormChange}
        >
        Cancel
        </Button>
      </Form>
    );

    const createButton = (
      <Button
        inverted
        size='big'
        onClick={this.handleFormChange}
      >
      Create
      </Button>
    )

    return(
      <div id="teacher-classes">
        <BurgerMenu />
        <main id="page-wrap" className="w-75">
          <div id="content">
            <h2>Your Classes</h2>
            <h4>{ele} {name}</h4>
            {this.state.isFormOpen ? <div>{createForm}</div> : <div>{createButton}</div>}
          </div>
        </main>
      </div>
    );
  }
}
export default TeacherClass;
