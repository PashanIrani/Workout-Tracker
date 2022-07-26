import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyWorkouts.scss";
import "../styles/SessionStats.scss";

const LoadSession = (props) =>{

    const [workoutName, setWorkoutName] = useState([]);
    const [workoutId, setWorkoutId] = useState([]);
    const [sessionDate, setSessionDate] = useState([]);
    //const [sessionArray, setSessionArray] = useState([]);

    useEffect(()=>{
    const userId = new URLSearchParams(location.search).get("id");
    axios.post("/get-all-sessions", { userId }).then((res) => {
      
      const data = res.data;
      for(let i =0; i< data.length;i++){
            console.log(i);
            console.log(data[i].workout_id);
            setWorkoutId(workoutId=>[...workoutId, data[i].workout_id]);
            //console.log(workoutId[i]);
            setSessionDate( sessionDate=>[...sessionDate,data[i].session_time]);
            setWorkoutName(workoutName =>[...workoutName,data[i].name]);
      }
    });
}, []);

return(
    <div>
        <div className="Page SessionStats"> 
       <ul>
      {workoutId.map((value, index) => {
        return <li className = "stats-card" onClick={()=>(location.href ='/App/SelectedSession')} key={index}>{workoutName[index]} on {sessionDate[index]} </li>
      })}
       </ul>
     </div>
    </div>
)
};
export default LoadSession;
