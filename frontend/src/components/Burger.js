import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import '../styles/Burger.css';

class Burger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
         this.handler = this.handler.bind(this);
    }

    handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})
    }

    handlerCloseSideBar = () => {
        this.setState({menuOpen: false});
    }

    handler = (e) => {
      e.preventDefault();
      this.setState({
          menuOpen: false
      });
    }

    showSettings (event) {
      event.preventDefault();
    }

    logout(event) {
      localStorage.clear();
    }

    render() {
        return (
            <div id="outer-container">
                <Menu
                    className="menu"
                    isOpen={this.state.menuOpen}
                    onStateChange={(state) => this.handleStateChange(state)}
                    pageWrapId={"page-wrap"}
                    outerContainerId={"outer-container"}
                >
                    <Link to="/teacher/class" className = "menu-item">Classes</Link>
                    <Link to="/teacher/calendar" className = "menu-item">Calendar</Link>
                    <Link to="/teacher/feedback" className = "menu-item">Feedback</Link>
                    <Link to="/" onClick={this.logout} className = "menu-item">Log out</Link>
                </Menu>
                Pizza
            </div>
        );
    }
}

export default Burger;
