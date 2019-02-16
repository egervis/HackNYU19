import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'

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
            <Menu
                className="menu"
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}
            >
            <h1>Menu</h1>
                <div id="social">
                    <a href="/" className="nav-link"><span>facebook</span></a>
                    <a href="/" className="nav-link"><span>twitter</span></a>
                    <a href="/" className="nav-link"><span>instagram</span></a>
                </div>
            </Menu>
        );
    }
}

export default Burger;
