import React from "react";
import { Nav, Navbar, Button, Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/TopNav.scss";
import { Link } from "react-router-dom";
import { FaUser, FaListUl } from "react-icons/fa";
import { ImHome3 } from "react-icons/im";
import { MdLogout } from "react-icons/md";
class TopNav extends React.Component {
  logout() {
    location.href = "/logout";
  }

  render() {
    return (
      <div className="top-nav-component">
        <Navbar fixed="bottom" variant="light" id="topNav">
          <Nav className="navbar">
            <Nav.Link className="navElement" as={Link} to="/App/">
              <span>
                <ImHome3 />
              </span>
              <span>Home</span>
            </Nav.Link>

            <Nav.Link className="navElement" as={Link} to="/App/Profile">
              <span>
                <FaUser />
              </span>
              <span>Profile</span>
            </Nav.Link>

            <Nav.Link className="navElement" as={Link} to="/App/MyWorkouts">
              <span>
                <FaListUl />
              </span>
              <span>Workouts</span>
            </Nav.Link>

            <Nav.Link
              className="navElement"
              onClick={() => {
                window.location = "/logout";
              }}
            >
              <span>
                <MdLogout />
              </span>
              <span>Logout</span>
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default TopNav;
