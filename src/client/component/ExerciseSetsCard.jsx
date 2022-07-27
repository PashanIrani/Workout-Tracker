import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/CurrentSession.scss";
import SetCard from "./SetCard.jsx";
import { IoMdAddCircle } from "react-icons/io";
import ShortUniqueId from "short-unique-id";

const ExerciseSetsCard = (props) => {
  let { info } = props;
  const [showingInfo, setShowingInfo] = useState(false);
  const [currentSets, setCurrentSets] = useState([]);

  const uid = new ShortUniqueId({ length: 10 });

  const addNewSet = () => {
    currentSets.push({
      id: uid(),
      weight:
        currentSets.length >= 1
          ? currentSets[currentSets.length - 1].weight
          : 0,
      reps:
        currentSets.length >= 1 ? currentSets[currentSets.length - 1].reps : 1,
    });

    setCurrentSets([...currentSets]);
  };

  useEffect(() => {
    props.onSetsUpdate(info.exercise_id, currentSets);
  }, [currentSets]);

  return (
    <div className="ExerciseSetsCard">
      <div className="info" onClick={() => setShowingInfo(!showingInfo)}>
        <span className="exercise-order">{info.exercise_order}</span>
        <span className="exercise-title">{info.name}</span>
        <img className="exercise-image" src={info.gif_url} alt={info.name} />
      </div>
      {showingInfo && (
        <div className="sets-container">
          {currentSets.length > 0 ? (
            currentSets.map((set, index) => {
              console.log(set.id);
              return (
                <SetCard
                  id={set.id}
                  key={set.id}
                  index={index}
                  weight={set.weight}
                  reps={set.reps}
                  onUpdate={(data) => {
                    currentSets[index] = { ...data };
                    setCurrentSets([...currentSets]);
                  }}
                  onDelete={(index) => {
                    currentSets.splice(index, 1);
                    setCurrentSets([...currentSets]);
                  }}
                ></SetCard>
              );
            })
          ) : (
            <p className="helper-text">
              No Sets... Add a new set to start tracking your workout!
            </p>
          )}

          <button className="secondary" onClick={addNewSet}>
            Add New Set <IoMdAddCircle />
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseSetsCard;
