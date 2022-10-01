import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { logout, signInWithGoogle, auth } from "../Firebase/Firebase";
import { useTranslation } from "react-i18next";
const languages = [
  { value: "en", text: "English" },
  { value: "hi", text: "Hindi" },
  { value: "bn", text: "Bengali" },
  { value: "pa", text: "Punjabi" },
];
const Nav = () => {
  const { t } = useTranslation();

  const [lang, setLang] = useState("en");

  // This function put query that helps to
  // change the language
  const handleChange = (e) => {
    setLang(e.target.value);
    let loc = "http://localhost:3000/";
    window.location.replace(loc + "?lng=" + e.target.value);
  };
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
          <Link style={{textDecoration:"None"}} to="/" className="nav-links">
            <Navbar.Brand style={{fontSize: "27px"}}>Class Monitor</Navbar.Brand>
          </Link>
          <Link style={{textDecoration:"None", color:"white"}} to="/admin" className="nav-links">
            View Details
          </Link>
        </Container>

        {/* <select style={{marginRight: "10px"}} value={lang} onChange={handleChange}>
          {languages.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            );
          })}
        </select> */}
        {user ? (
          <Dropdown>
            <Dropdown.Toggle
              style={{marginRight:"10px"}}
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
