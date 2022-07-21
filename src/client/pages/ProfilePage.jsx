import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ProfilePage.scss";
import { Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "../../../node_modules/react-datepicker/dist/react-datepicker.css";
const ProfilePage = () => {
  // the values in this "enum" will also be shown to the user
  const LogState = {
    BODY_WEIGHT: "Body Weight",
    FAT_PERCENTAGE: "Fat Percentage",
    NOTHING: "NOTHING",
  };

  const [username, setUsername] = useState("");
  const [showNewLogModal, setShowNewLogModal] = useState(false);
  const [isCurrentlyLogging, setIsCurrentlyLogging] = useState(
    LogState.NOTHING
  );

  const [dateValue, setDateValue] = useState(new Date());
  const [value, setValue] = useState(0);
  const [modalLabels, setModalLabels] = useState({});

  useEffect(() => {
    axios.get("/user-info").then((res) => {
      setUsername(res.data.name);
    });
  }, []);

  useEffect(() => {
    switch (isCurrentlyLogging) {
      case LogState.BODY_WEIGHT:
        setModalLabels({
          timeLabel: "Time: ",
          valueLabel: "Weight: ",
          valueSuffix: "lbs",
        });
        break;
      case LogState.FAT_PERCENTAGE:
        setModalLabels({
          timeLabel: "Time: ",
          valueLabel: "Fat Percentage: ",
          valueSuffix: "%",
        });
        break;
      default:
        setModalLabels({});
        break;
    }
  }, [isCurrentlyLogging]);

  const newLogModalHideCallback = () => {
    setIsCurrentlyLogging(LogState.NOTHING);
    setShowNewLogModal(false);
    setValue(0);
  };

  const saveNewLog = () => {
    newLogModalHideCallback();
    // TODO: save to DB
  };

  const openNewLogModal = (state) => {
    setShowNewLogModal(true);
    setIsCurrentlyLogging(state);
  };

  return (
    <div className="Page Profile-Page">
      <h1>{username}</h1>

      <h2>Body Logs</h2>
      <div>
        <button
          className="secondary"
          onClick={() => {
            openNewLogModal(LogState.BODY_WEIGHT);
          }}
        >
          Add Body Weight Log
        </button>
        <div></div>
      </div>

      <div>
        <button
          className="secondary"
          onClick={() => {
            openNewLogModal(LogState.FAT_PERCENTAGE);
          }}
        >
          Add Fat percentage Log
        </button>
        <div></div>
      </div>

      <Modal
        show={showNewLogModal}
        onHide={newLogModalHideCallback}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Log new {isCurrentlyLogging}:</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            {modalLabels.timeLabel}{" "}
            <DatePicker
              showTimeSelect
              selected={dateValue}
              onChange={(date) => setDateValue(date)}
              dateFormat="MMMM d, yyyy h:mm aa"
              maxDate={new Date()}
              minTime={
                dateValue.toDateString() === new Date().toDateString()
                  ? new Date(new Date().setHours(0, 0, 0, 0))
                  : null
              }
              maxTime={
                dateValue.toDateString() === new Date().toDateString()
                  ? new Date()
                  : null
              }
            />
          </div>
          <div>
            {modalLabels.valueLabel}
            <input
              type="number"
              value={value}
              onInput={(e) => setValue(e.target.value)}
            />
            {modalLabels.valueSuffix}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <button onClick={saveNewLog}>Add</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
