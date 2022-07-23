import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyWorkouts.scss";
import "../styles/SessionStats.scss";

const SessionStats = (props) => {
  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState([]);
  const [sessionTime, setSessionTime] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [setCount, setSetCount] = useState("");
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("id");
    axios.post("/get-session", { sessionId }).then((res) => {
      const data = res.data[0];
      setSessionTime(data.session_time);
      setWorkoutName(data.name);
      fetchSessionInfo(sessionId);
      fetchExerciseSets(data.workout_id, sessionId);
    });
  }, []);
  const fetchSessionInfo = (sessionId) => {
    axios.post("/get-session-info", { sessionId }).then((resp) => {
      console.log(resp.data);
      setTotalWeight(resp.data[0].total_weight);
      setSetCount(resp.data[0].set_count);
    });
  };
  const fetchExerciseSets = (workoutId, sessionId) => {
    axios.post("/get-session-sets", { workoutId, sessionId }).then((resp) => {
      let sets = resp.data;
      let temp = {};
      let i,
        j = 0;
      for (i = 0; i < sets.length; i++) {
        temp[sets[i].exercise_id] = [];
      }
      if (i >= sets.length) {
        for (j = 0; j < sets.length; j++) {
          temp[sets[j].exercise_id].push(sets[j]);
        }
      }
      if (j >= sets.length) {
        console.log(temp);
        setSets(temp);
        setIsReady(true);
      }
    });
  };
  return (
    isReady && (
      <div className="Page SessionStats">
        <div className="stats-container">
          <h1>Session Summary: {workoutName}</h1>
          <p>
            Time completed: <span className="text-muted">{sessionTime}</span>
          </p>
          <p>Total weight: {totalWeight}</p>
          <p>Total sets: {setCount}</p>
          <div className="stats-card">
            {Object.keys(sets).map((key) => {
              return (
                <div key={key} className="stats-card-inner">
                  <div className="exercise-title">
                    {sets[key][0].name}
                    {sets[key].map((e) => {
                      return (
                        <div key={e.set_id} className="sets-info">
                          <span>
                            {e.reps}reps x {e.weight}lbs
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};
export default SessionStats;
