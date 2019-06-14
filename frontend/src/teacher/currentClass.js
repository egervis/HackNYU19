import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Burger from '../components/Burger';
import '../styles/Burger.css';
import {getLessons, getUsers} from '../requests/requestBuilder';

class currentClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myClass: this.prop, //TRACEY
      lessonIds: '',
      studentIds: '',
    };
    console.log(this);

    this.fetchLessons = this.fetchLessons.bind(this);
    this.lessonsLoop = this.lessonsLoop.bind(this);
    this.fetchtudents = this.fetchtudents.bind(this);
    this.studentsLoop = this.studentsLoop.bind(this);
    this.openLesson = this.openLesson.bind(this);
    this.openStudent = this.openStudent.bind(this);
  }

  fetchLessons() {
    this.lessonIds = this.prop.lessonids;
    const lessons = getLessons(this.lessonIds);
    return lessons;
  }

  fetchtudents() {
    this.studentIds = this.prop.studentids;
    const students = getUsers(this.studentIds);
    return students;
  }
  openLesson(id) {
    //localstore id, move to next page which is lesson
  }
  openStudent(id) {
    //localstore id, move to next page which is lesson
  }

  lessonsLoop() {
    const arr = this.fetchLessons();
    let lessons = '';
    for (let i = 0; i < arr.length; i++) {
      lessons +=
        '<div class="mx-auto w-75 bg-dark my-5 px-5 py-5" onClick=openLesson("' +
        arr[i].lessonid +
        '")>' +
        arr[i].lessonname +
        '</div>';
    }
    return lessons;
  }

  studentsLoop() {
    const arr = this.fetchStudents();
    let students = '';
    for (let i = 0; i < arr.length; i++) {
      students +=
        '<div class="mx-auto w-75 bg-dark my-5 px-5 py-5" onClick=openStudent("' +
        arr[i].studentid +
        '")>' +
        arr[i].firstname +
        arr[i].lastname +
        '</div>';
    }
    return students;
  }

  render() {
    let temp = <></>;
    temp = this.lessonsLoop();
    return (
      <div>
        <div className="burger-bar">
          <Burger />
        </div>
        <div className="mx-auto w-75 bg-dark my-5 px-5 py-5">
          <div>
            <h3 className="pb-3">Current Class</h3>
          </div>
        </div>
      </div>
    );
  }
}
export default currentClass;

// <li class="nav-item">
//   <Link to="/" class="nav-link">Contact Us</Link>
// </li>
