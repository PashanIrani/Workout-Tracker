import React, { useState } from "react";
import { useEffect } from "react";
import "../styles/CurrentSession.scss";
import { BiMinusCircle } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";

const SetCard = (props) => {
  let { weight, reps, index } = props;

  const [weightValue, setWeightValue] = useState(weight);
  const [repValue, setRepValue] = useState(reps);

  const updateValue = (value, setter, increment) => {
    let newValue = value + increment;
    setter(newValue > 0 ? newValue : 0);
  };

  useEffect(() => {
    props.onUpdate({
      weight: weightValue,
      reps: repValue,
    });
  }, [repValue, weightValue]);

  return (
    <div className="SetCard">
      <div className="set-indicator">
        <span>Set</span>
        <span>{index + 1}</span>
      </div>

      <div className="input-container">
        <div>
          <div className="input-label">Weight</div>
          <div className="input-value">
            <button
              className="secondary"
              disabled={weightValue === 0}
              onClick={() => {
                updateValue(weightValue, setWeightValue, -5);
              }}
            >
              <BiMinusCircle />
            </button>
            <span>{weightValue} lbs</span>
            <button
              className="secondary"
              onClick={() => {
                updateValue(weightValue, setWeightValue, 5);
              }}
            >
              <IoMdAddCircle />
            </button>
          </div>
        </div>

        <div>
          <div className="input-label">Reps</div>
          <div className="input-value">
            <button
              disabled={repValue === 0}
              className="secondary"
              onClick={() => {
                updateValue(repValue, setRepValue, -1);
              }}
            >
              <BiMinusCircle />
            </button>
            <span>{repValue}</span>
            <button
              className="secondary"
              onClick={() => {
                updateValue(repValue, setRepValue, 1);
              }}
            >
              <IoMdAddCircle />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetCard;
