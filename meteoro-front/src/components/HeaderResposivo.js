import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {
    CDBSidebar,
    CDBSidebarHeader,
    CDBSidebarMenuItem,
    CDBSidebarContent,
    CDBSidebarMenu,
    CDBSidebarSubMenu,
    CDBSidebarFooter,
    CDBBadge,
    CDBContainer,
    CDBSidebarCTA,
  } from 'cdbreact';
import { Link } from 'react-router-dom';

function HeaderResponsivo() {
  return (
    <Navbar collapseOnSelect expand="lg" className="d-sm-none navbar-dark px-1" style={{ backgroundColor:"#ffa500" }}>
        <Navbar.Brand className="mx-5" prefix={<i className="fa fa-bars" />}>METEORO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mx-3">
            <Nav.Link >Ponto Eletronico</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default HeaderResponsivo;