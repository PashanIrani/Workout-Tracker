import React, { Component} from "react";
import "../styles/App.scss";
import { Outlet, Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import TopNav from "../component/TopNav";

class App extends Component{
  render(){
    return(
        <div className="Page">
        <TopNav></TopNav>
          <h1>Workout Tracker 💪</h1>
            <Outlet />
        </div>
        
    );
  }
}

export default App;