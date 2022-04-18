import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Logo from "../../img/LogoAzulT.png";
import "./menu.css";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }



  gotoDocentes = () => {
    this.props.history.push("/docentes");
  };

  gotoAreas = () => {
    this.props.history.push("/areas");
  };

  gotoNovedades = () => {
    this.props.history.push("/novedades");
  };

  gotoAgenda = () => {
    this.props.history.push("/agendas");
  };

  render() {
    return (
      <Container id="menu-container" flid="md">
        <img src={Logo} alt="Logo" className="logo-menu" />
        <Row>
          <Col>
            <div className="d-grid col-md-6 offset-md-3 gap-2">
              <br />
              <Button variant="primary" size="lg" onClick={this.gotoDocentes}>
                Regitro de Docentes
              </Button>
              <Button variant="primary" size="lg" onClick={this.gotoAreas}>
                Asignación de Áreas Académicas
              </Button>
              <Button variant="primary" size="lg" onClick={this.gotoAgenda}>
                Programación de Clases
              </Button>
              <Button variant="primary" size="lg" onClick={this.gotoNovedades}>
                Novedades
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
