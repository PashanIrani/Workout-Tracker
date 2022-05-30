import React, { Component} from "react";
import "../styles/App.css";
import { Outlet, Link } from "react-router-dom";
import TopNav from "../component/TopNav";
class App extends Component{
  render(){
    return(
        <div className="App">
          <h1>Workout Tracker 💪</h1>
            <TopNav/>
            <Outlet />
        </div>
    );
  }
}

export default App;