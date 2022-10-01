import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { auth } from "../../Firebase/Firebase";
import Table from 'react-bootstrap/Table';
import { API } from "../services/http.service";
import { useRef } from "react";
import Meeting from "../Meeting/Meeting";

const Admin = () => {

//   const [user, setUser] = useState();
  const [users, setUsers] = useState();
  const [showDetails, setShowDetails]=useState(false);

  const seeDetails = () => {
    setShowDetails(true);

    API.get("meeting.json")
      .then((res) => {
        console.log("succesfully got users!------->", res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("err in get API-------> ", err);
      });

  }


  return (
    <>
      {
        <div className="pf-container">
          <br />
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Meeting 1</Card.Title>
              <Card.Text>Big Data Analytics</Card.Text>
              <Button variant="primary" onClick={seeDetails}>See Details</Button>           
            </Card.Body>
          </Card>
          <br />
          {showDetails && users &&
            <>{Object.keys(users).map((id, index) => {
                return <><Table striped bordered hover variant="dark">
                    <tbody>
                        <tr>
                        <td>Name</td>
                        <td>{users[id].name}</td>
                        </tr>
                        <tr>
                        <td>Email</td>
                        <td>{users[id].email}</td>
                        </tr>
                        <tr>
                        <td>Start Time</td>
                        <td>{users[id].startTime}</td>
                        </tr>
                        <tr>
                        <td>End Time</td>
                        <td>{users[id].endTime}</td>
                        </tr>
                        
                
                        {users[id].stats && Object.keys(users[id].stats).map((key, index) => {

                            return (<tr>
                            <td>{key}</td>
                            <td>{users[id].stats[key]}</td>
                            </tr>)

                        })}
                        
                        <tr>
                        <td>Score</td>
                        <td>{users[id].score}</td>
                        </tr>
                
                    </tbody>

            
                </Table>
                <br />
                </>
            })}

            </>
        }

          <br />
        </div>
      }
    </>
  );
};
export default Admin;
