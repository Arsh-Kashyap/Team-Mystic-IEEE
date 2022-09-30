import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { logout, signInWithGoogle, auth } from "../Firebase/Firebase";

const Nav = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Link to="/" className="nav-links">
            <Navbar.Brand>Hackathon</Navbar.Brand>
          </Link>
        </Container>

        {user ? (
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-button-dark-example1"
              variant="secondary"
            >
              <img
                referrerpolicy="no-referrer"
                src={
                  user.photoURL
                    ? user.photoURL
                    : "https://img.icons8.com/doodle/48/000000/user.png"
                }
                style={{ height: "30px", width: "40px" }}
                alt="User-icon"
              />{" "}
              Welcome
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark" className="dropdownMenu">
              <Dropdown.Item className="weex" as={Link} to={"/profile"}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item className="logoutDropdown">
                <Button
                  className="logoutButton"
                  onClick={logout}
                  buttonstyle="btn--outline"
                >
                  Logout
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button
            onClick={
              user ? () => logout(setUser) : () => signInWithGoogle(setUser)
            }
          >
            {user ? "Logout" : "Signup / Login"}
          </Button>
        )}
      </Navbar>
    </>
  );
};
export default Nav;
