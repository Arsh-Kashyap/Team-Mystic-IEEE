import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { auth } from "../../Firebase/Firebase";
import { API } from "../services/http.service";
import { useRef } from "react";
import Meeting from "../Meeting/Meeting";

const Home = () => {
  const userDetails = useRef();
  const [user, setUser] = useState();
  const [users, setUsers] = useState();
  const [id, setId] = useState();

  const [isStart, setIsStart] = useState(false);
  const score = useRef(100);

  useEffect(() => {
    API.get("meeting.json")
      .then((res) => {
        console.log("succesfully got users!------->", res);
        setUsers(res);
      })
      .catch((err) => {
        console.log("err in get API-------> ", err);
      });
  }, [userDetails.current]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });

    // document.addEventListener("fullscreenchange", (event) => {
    //   if (document.fullscreenElement) {
    //     // We’re going fullscreen
    //   } else {
    //     setIsStart(false);
    //   }
    // });
  }, []);

  //   useEffect(() => {
  //     if(!isStart)
  //         updateUserDetails('1');
  //     else
  //         storeUserDetails();
  //   }, [userDetails]);

  const updateUserDetails = async (id2) => {
    API.put(
      "meeting/" + id + ".json?updateMask.fieldPaths=endTime",
      userDetails.current
    )
      .then(() => {
        console.log("succesfully updated!");
      })
      .catch((err) => {
        console.log("err in put API-------> ", err);
      });
    console.log(id);
    // db.ref("meeting/"+id).update({ endtime: Date().toLocaleString() });
  };

  const storeUserDetails = () => {
    API.post("meeting.json", userDetails.current)
      .then((res) => {
        console.log("succesfully added!", res);
        setId(res.data.name);
      })
      .catch((err) => {
        console.log("err in post API-------> ", err);
      });
  };

  const setStartDetails = (m) => {
    setIsStart(true);
    userDetails.current = {
      name: user.displayName,
      email: user.email,
      meeting: m,
      startTime: Date().toLocaleString(),
      endTime: null,
    };
    storeUserDetails();
  };

  const setEndDetails = (m) => {
    setIsStart(false);

    userDetails.current = {
      ...userDetails.current,
      endTime: Date().toLocaleString(),
    };
    updateUserDetails("1");
    // setUserDetails({"name": user.displayName, "email":user.email, "meeting":m , "startTime":Date().toLocaleString(), "endTime":null })
  };

  return (
    <>
      <div className="pf-container">
        <br />
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Meeting 1</Card.Title>
            <Card.Text>Big Data Analytics</Card.Text>
            {isStart ? (
              <>
                <Button variant="primary" onClick={() => setEndDetails(1)}>
                  stop
                </Button>
              </>
            ) : (
              <Button variant="primary" onClick={() => setStartDetails(1)}>
                start
              </Button>
            )}
          </Card.Body>
        </Card>
        <Meeting
          isStart={isStart}
          id={id}
          userDetails={userDetails.current}
          score={score}
        />
        <br />
      </div>
    </>
  );
};
export default Home;
