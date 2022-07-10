import React from 'react';
import { Nav, Navbar, Button, Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/TopNav.scss'
import { Link } from 'react-router-dom'
import { FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import {IoHome} from 'react-icons/io5'
class TopNav extends React.Component {

    logout() {
        location.href = '/logout';
    }

    render() {
        return (
            <div>
                <Navbar fixed="bottom" variant="light" id="topNav">
                    <Nav>
                        <Nav.Link className="navElement" as={Link} to="/App/"><IoHome/></Nav.Link>
                        <Nav.Link className="navElement" as={Link} to="/App/AddWorkout">Add New</Nav.Link>
                        <Nav.Link className="navElement" as={Link} to="/App/MyWorkouts">My Workouts</Nav.Link>
                        <Nav.Link className="navElement" as={Link} to="/App/Settings">Settings</Nav.Link>
                        <DropdownButton id="dropdown-right"
                            title={<FaUser className="profileIcon" />}>
                            <div className="dropdown-content">
                                <Dropdown.Item >
                                        <FaUser className="profileIcon" /> Profile
                                </Dropdown.Item>
                                <Dropdown.Item onClick={this.logout}>
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