import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/MyWorkouts.scss'
import {Col,Row} from 'react-bootstrap'
const WorkoutCard = (props) => {
    
  const [showExercises,setShowExercises] = useState(false);
  const e = props.workout;
  return (<div className="workouts-card" onMouseEnter={()=>{setShowExercises(true)}} onMouseLeave={()=>setShowExercises(false)}>
          
    <Col span="2" className="workout-card-title">
      <span>{e.name}</span>
    </Col> 

    <Col span="4">
    {
      showExercises &&
      e.exercises.map((item) => {
        return (<div key={item.gif_url}>
          <div className="exercise-title">
            <span>{item.name}</span>
          </div>
          </div>)
      })
    }
    </Col>
    <Col span="2" >
      <span className="start-button">Start</span>
      <span className="my-buttons">Edit</span>
      <br/>
      <span className="my-buttons">Delete</span>
    </Col>
    
    
    
    </div>)
}
export default WorkoutCard;