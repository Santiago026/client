import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import "./home.css";
import Logo from "../../img/LogoazulP.png";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }
  
  gotoLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <Container id="home-container" fluid="md">
        <img src={Logo} alt="Logo" className="logo-home" />
        <Row>
          <Col>
            <h1>Gestor Administrativo Para Plataformas Web</h1>
            <div className="d-grid gap-2">
              <br />
              <Button 
              variant="primary" size="lg" 
              onClick={this.gotoLogin}>
                Inicio
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
