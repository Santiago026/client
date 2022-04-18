import React from "react";
import { Container, Dropdown, DropdownButton, Nav, Navbar, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/logo.webp";
import artboard from "../img/Artboard 5.webp";
import "./navbar.css";
import Cookies from 'universal-cookie/es6';

const cookies = new Cookies();

export default class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  logout() {
    cookies.remove('_s');
    window.location.reload();
  }

  render() {
    return (
      <Navbar fixed="top" id="navbar" variant="dark">
        <Container>
          <img src={logo} alt="logo" className="logo" />
          <img src={artboard} alt="artboard" className="artboard" />
          <Navbar.Brand className="navbar-brand" href="/">
            ColDream
            <span id="usuario-sub-brand"></span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>*/}
            </Nav>

            <DropdownButton id="dropdown-basic-button" title="Usuario">
              <Dropdown.Header id="dropdown-header">
                <Row>
                  <FontAwesomeIcon icon={faUserCircle} />
                </Row>
                <Row>USUARIO</Row>
              </Dropdown.Header>
              <Dropdown.Divider />             
              <Dropdown.Item id="dropdown-item" href="/menu">Menú</Dropdown.Item>
              <Dropdown.Item id="dropdown-item" onClick={() => this.logout()}>
                Cerrar sesión
              </Dropdown.Item>         
            </DropdownButton>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
