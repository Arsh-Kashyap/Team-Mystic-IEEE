import { ProctorApp, getStatistics } from "react_proctoring_library";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";

function Test(props) {
  return (
    <div>
      <h1>Proctoring Window</h1>
    </div>
  );
}

function Temp() {
  const testIdentifier = "unique-proctoring-identifier";
  const fullScreenMessage =
    "This test can only be completed in Full Screen Mode, do you want to start this test?";
  const getStats = () => {
    console.log(getStatistics(testIdentifier));
  };

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

export default Temp;
