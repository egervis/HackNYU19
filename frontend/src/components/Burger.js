import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu';
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

    render() {
        return (
            <div>
                <Menu
                    className="menu"
                    isOpen={this.state.menuOpen}
                    onStateChange={(state) => this.handleStateChange(state)}
                >
                    <h1>Menu</h1>
                    <Link to="/teacher/class" className = "menu-item">Classes</Link>
                    <Link to="/teacher/calendar" className = "menu-item">Calendar</Link>
                    <Link to="/" className = "menu-item">Log out</Link>
                </Menu>
                Pizza
            </div>
        );
    }
}

export default Burger;
