import React, { useEffect, useState } from "react";
import AddWorkout from "../pages/AddWorkout";
import axios from "axios";
import "../styles/MyWorkouts.scss";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/SessionStats.scss";


const SessionStats = (props) => {
  const [workoutName, setWorkoutName] = useState("");
  const [exerciseSets, setExerciseSets] = useState([]);
  const [sessionTime, setSessionTime] = useState("");
  const [isReady,setIsReady] = useState(false);
  useEffect(()=> {
    const sessionId = (new URLSearchParams(location.search)).get('id'); 
    axios.post("/get-session", { sessionId }).then((res)=> {
      const data = res.data[0];
      setSessionTime(data.session_time);
      setWorkoutName(data.name);
      fetchExercises(data.workout_id,sessionId);
    })
  },[])
  const fetchExercises = (workoutId,sessionId) => {
    axios.post("/retrieve-workout-exercises", { id:workoutId }).then((resp) => {
      fetchSessionDetails(resp.data, sessionId);
    });
  };
  const fetchSessionDetails = (data, sessionId) => {
    let exercises = data;
    let exerciseId = '';
    let currentExercise = {};
    let i = 0;
    for (i=0;i<exercises.length;i++){
      exerciseId = exercises[i].exercise_id;
      currentExercise = exercises[i];
      axios.post("/get-exercise-sets", { sessionId, exerciseId }).then((resp) => {
        currentExercise.sets = resp.data;
        console.log(currentExercise);
      });
    }
    if (i>=exercises.length){
      setExerciseSets(exercises);
      setIsReady(true);
    }
  };
  return (
    isReady && (
      <div className="Page SessionStats">
        <div className="stats-container">
          <h1>Completed workout: {workoutName}</h1>
            <div className="stats-card">
            {exerciseSets.map((e) => {
              return (<div key={e.exercise_id}>
                <span>{e.name}</span>
                <span>{e.sets[0].reps}x{e.sets[0].reps.weight}</span>
                </div>)
            })}
            </div>
        </div>
      </div>
    )
      
    )
};
export default SessionStats;
