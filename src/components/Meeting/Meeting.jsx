import React from "react";
import { ProctorApp, getStatistics } from "react_proctoring_library";
import Button from "react-bootstrap/Button";
import { API } from "../services/http.service";
import { useEffect } from "react";
import { useRef } from "react";

function Test(props) {
  return (
    <div>
      <h1>Meeting Window</h1>
    </div>
  );
}

function Meeting({ isStart, id, userDetails, score }) {
  const meetingStopped = useRef();
  const testIdentifier = "unique-proctoring-identifier";
  const fullScreenMessage =
    "This meeting can only be attended in Full Screen Mode, do you want to start this meeting?";
  const getStats = () => {
    const stats = getStatistics(testIdentifier);
    console.log(stats);
    return stats;
  };

  // const MINUTE_MS = 1800;
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("Logs every 3 seconds");
  //     const stats = getStats();
  //     console.log(stats);
  //   }, MINUTE_MS);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, []);
  console.log(meetingStopped.current);
  if (!isStart && meetingStopped.current === false) {
    meetingStopped.current = true;
    console.log("is start  is false");
    const stats = getStats();
    score.current =
      score.current -
      stats.TAB_SWITCH_AWAY * 5 -
      stats.LOOKED_AWAY -
      stats.CHANGE_IN_NUMBER_OF_PEOPLE_IN_CAMERA * 5;
    console.log("Score: ", score.current);
    API.put("meeting/" + id + ".json?updateMask.fieldPaths=endTime", {
      ...userDetails,
      stats: stats,
      score: score.current,
    })
      .then(() => {
        console.log("succesfully updated!");
      })
      .catch((err) => {
        console.log("err in put API-------> ", err);
      });
  }

  if (isStart) {
    meetingStopped.current = false;
  }

  return (
    <div>
      {isStart && (
        <div>
          <div className="App">
            <ProctorApp
              TestComponent={Test}
              testIdentifier={testIdentifier}
              fullScreenMessage={fullScreenMessage}
            />
          </div>
          <Button onClick={getStats}>Get Statistics</Button>
        </div>
      )}
    </div>
  );
}

export default Meeting;
