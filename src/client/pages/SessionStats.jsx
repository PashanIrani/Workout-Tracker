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
  const [favExercise, setFavExercise] = useState("");
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("id");
    axios.post("/get-session", { sessionId }).then((res) => {
      const data = res.data[0];
      setSessionTime(data.session_time);
      setWorkoutName(data.name);
      fetchSessionInfo(sessionId);
      fetchExerciseSets(data.workout_id, sessionId);
      fetchFavExercise();
    });
  }, []);
  const fetchFavExercise = () => {
    axios.get("/get-fav-exercise").then((resp) => {
      setFavExercise(resp.data[0]);
    });
  };
  const fetchSessionInfo = (sessionId) => {
    axios.post("/get-session-info", { sessionId }).then((resp) => {
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
        setSets(temp);
        setIsReady(true);
      }
    });
  };

  return (
    isReady && (
      <div className="Page SessionStats">
        <div className="stats-container">
          <h1>
            Session Summary: <span className="highlighted">{workoutName}</span>
          </h1>
          <p>
            Time completed: <span className="text-muted">{sessionTime}</span>
          </p>
          <p>Total weight: {totalWeight} lbs</p>
          <p>Total sets: {setCount}</p>

          <p>
            Favourite exercise that is in all your workouts:{" "}
            <span className="highlighted">{favExercise!=null?favExercise.name:'none'}</span>
          </p>
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
                            <span className="set-order">{e.set_order}</span>
                            {e.weight} lbs x {e.reps} reps
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
