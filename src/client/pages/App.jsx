import React, { Component} from "react";
import "../styles/App.scss";
import { Outlet, Link } from "react-router-dom";

class App extends Component{
  render(){
    return(
        <div className="Page">
          <h1>Workout Tracker 💪</h1>
            <Outlet />
        </div>
        
    );
  }
}

export default App;