import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyWorkouts.scss";
import "../styles/LoadSession.scss";

const LoadSession = (props) => {
  const [workoutName, setWorkoutName] = useState([]);
  const [workoutId, setWorkoutId] = useState([]);
  const [sessionDate, setSessionDate] = useState([]);
  const [sessionId, setSessionId] = useState([]);

  useEffect(() => {
    axios.post("/get-all-sessions").then((res) => {
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        setWorkoutId((workoutId) => [...workoutId, data[i].workout_id]);
        setSessionId((sessionId) => [...sessionId, data[i].session_id]);
        setSessionDate((sessionDate) => [...sessionDate, data[i].session_time]);
        setWorkoutName((workoutName) => [...workoutName, data[i].name]);
      }
    });
  }, []);

  return (
    <div>
      {workoutId.length > 0 ? (
        workoutId.map((value, index) => {
          return (
            <div
              className="session-card"
              onClick={() =>
                (location.href = `/App/SessionStats?id=${sessionId[index]}`)
              }
              key={index}
            >
              <span className="workout-title">{workoutName[index]} </span>
              <span className="session-date"> {sessionDate[index]}</span>{" "}
            </div>
          );
        })
      ) : (
        <p>
          You have no previous workout sessions. Get off the couch and move!
        </p>
      )}
    </div>
  );
};
export default LoadSession;
