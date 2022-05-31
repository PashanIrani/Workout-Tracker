import React, { Component} from "react";
import "../styles/App.scss";
import { Outlet, Link } from "react-router-dom";
import TopNav from "../component/TopNav";
class App extends Component{
  render(){
    return(
        <div className="App">
          <h1>Workout Tracker 💪</h1>
            <Outlet />
        </div>
        
    );
  }
}

export default App;