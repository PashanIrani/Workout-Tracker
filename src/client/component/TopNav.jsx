import React from 'react';
import { Nav, Navbar, Button, Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/TopNav.scss'
import { Link } from 'react-router-dom'
import { FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import {ImHome3} from 'react-icons/im';
import {GrHistory} from 'react-icons/gr';


class TopNav extends React.Component {

    logout() {
        location.href = '/logout';
    }

    render() {
        return (
            <div>
                <Navbar fixed="bottom" variant="light" id="topNav">
                    <Nav className = "navbar">
                        <Nav.Link className="navElement" as={Link} to="/App/"> <span> <ImHome3  > </ImHome3>  </span> </Nav.Link>
                        <Nav.Link className="navElement" as={Link} to="/AllWorkouts/"> <span> <GrHistory></GrHistory> </span></Nav.Link>
                        <Nav.Link className="navElement" as={Link} to="/login/"><span><FaUser ></FaUser></span></Nav.Link>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default TopNav;