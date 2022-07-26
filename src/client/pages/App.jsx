import React, { Component } from "react";
import "../styles/App.scss";
import "../styles/AddWorkout.scss";
import { Outlet, Link } from "react-router-dom";
import { Button, Navbar } from "react-bootstrap";
import TopNav from "../component/TopNav";
import LoadSession from "./LoadSession";

class App extends Component {
  
  render() {
    // change this id here to the id in your db for testing
    var id = "1xUiXF";

    return (
      <div className="Page">
        <h1>Workout Tracker 💪</h1>
        <a href="/App/AddWorkout/"> Add Workout </a>
        <a href="/App/MyWorkouts/"> All Workouts </a>
        <div style={{ display: "flex", justifyContent: 'center'}}>
          <button onClick={()=>(location.href = "/App/MyWorkouts/")}> Start Workout </button>
          </div>
          <div onClick={()=>(location.href=`/App/SessionStats?id=${id}`)}>Session Stats</div> 
          <h2> Previous Sessions </h2>
         <LoadSession></LoadSession>
        {/* for testing purposes; id from dashboard should also be passed this way */}
      
        <Outlet />
      </div>
    );
  }
}

export default App;
