import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { elastic as Menu } from 'react-burger-menu';
import '../styles/Burger.css';

class BurgerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpen: false
        }
        this.handler = this.handler.bind(this);
    }

    handler = (e) => {
      e.preventDefault();
      this.setState({
          menuOpen: false
      });
    }

    showSettings (e) {
      e.preventDefault();
    }

    logout(e) {
      localStorage.clear();
    }

    render() {
        var isMenuOpen = function(state) {
            return state.isOpen;
        };

        const usertype = this.props.usertype;

        return (
            <div id="outer-container">
                <Menu
                    className="menu"
                    isOpen={this.state.menuOpen}
                    onStateChange={isMenuOpen}
                    pageWrapId={"page-wrap"}
                    outerContainerId={"outer-container"}
                >
                    <Link to={'/dashboard'} className = "menu-item">Classes</Link>
                    <Link to={'/'+usertype+'/calendar'} className = "menu-item">Calendar</Link>
                    <Link to={'/'+usertype+'/feedback'} className = "menu-item">Feedback</Link>
                    <Link to="/" onClick={this.logout} className = "menu-item">Log out</Link>
                </Menu>
            </div>
        );
    }
}

export default BurgerMenu;
