import React from 'react';
import { Nav, Navbar, Button, Dropdown, DropdownButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/LogoutNav.scss'
import { Link } from 'react-router-dom'
import {RiLogoutBoxRFill} from 'react-icons/ri';


class LogoutNav extends React.Component{
    render(){
    return (
        <div>
            <Navbar fixed = "top" variant="light" id="logoutNav">
            <Nav className = "logout">
                        <Nav.Link className="navElement1" as={Link} to="Homepage/">  <RiLogoutBoxRFill size={45} >  </RiLogoutBoxRFill>  </Nav.Link>
                        </Nav>
                </Navbar>
        </div>

    )

    }
}

export default LogoutNav