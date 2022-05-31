import React from 'react';
import { Nav, Navbar, Button, Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/TopNav.scss'
import { Link } from 'react-router-dom'
import { FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';

class TopNav extends React.Component {
    render() {
        return (
            <div>
                <Navbar fixed="top" variant="light" id="topNav">
                    <Nav>
                        <Nav.Link className="navElement" as={Link} to="/">Home</Nav.Link>
                        <Nav.Link className="navElement" as={Link} to="/AddWorkout">Add New</Nav.Link>
                        <Nav.Link className="navElement" as={Link} to="/AllWorkouts">My Workouts</Nav.Link>
                        <Nav.Link className="navElement" as={Link} to="/Settings">Settings</Nav.Link>
                        <DropdownButton id="dropdown-right"
                            title={<FaUser className="profileIcon" />}>
                            <div className="dropdown-content">
                                <Dropdown.Item >
                                        <FaUser className="profileIcon" /> Profile
                                </Dropdown.Item>
                                <Dropdown.Item >
                                        <FaSignOutAlt className="signOutIcon" /> Sign Out
                                </Dropdown.Item>
                            </div>
                        </DropdownButton>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default TopNav;