import React from "react";
import { ProctorApp, getStatistics } from "react_proctoring_library";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

function Test(props) {
  return (
    <div>
      <h1>Meeting Window</h1>
    </div>
  );
}

function Meeting() {
  const testIdentifier = "unique-proctoring-identifier";
  const fullScreenMessage =
    "This meeting can only be attended in Full Screen Mode, do you want to start this meeting?";
  const getStats = () => {
    console.log(getStatistics(testIdentifier));
  };
  useEffect(() => {});
  return (
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
  );
}

export default Meeting;
