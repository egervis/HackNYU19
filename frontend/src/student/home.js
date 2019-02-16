import React, { Component } from 'react';
import '../styles/studenthome.css';

class StudentHome extends Component{
  render(){
    return (
      <div className="StudentHome">
        <div id="heading" class="container-fluid w-75 bg-dark">
          <ul class="nav nav-pills nav-justified mb-5 py-3" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" data-toggle="pill" href="#tab1">My Classes</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="pill" href="#tab2">My Students</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="pill" href="#tab3">My Whatever</a>
            </li>
          </ul>
        </div>

        <div id="bodycontainer" class="container-fluid w-75 bg-dark pb-3">
          <div class="tab-content">
            <div id="tab1" class="container tab-pane active"><br/>
              <h3>MY YEET</h3>
            </div>
            <div id="tab2" class="container tab-pane fade"><br/>
              <h3>YOUR YEET</h3>
            </div>
            <div id="tab3" class="container tab-pane fade"><br/>
              <h3>GET YEETED</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StudentHome;
