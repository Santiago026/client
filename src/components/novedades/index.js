import React from 'react';
import { Container, Nav, Row } from 'react-bootstrap';
import NovedadesBuscar from './crud/buscar';
import NovedadesCrear from './crud/crear';
import NovedadesEditar from './crud/editar';
import './novedades.css';

export default class Novedades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'buscar',
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdNovedad = this.setIdNovedad.bind(this);
    this.getIdNovedad = this.getIdNovedad.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdNovedad(id) {
    this.setState({ _id: id });
  }

  getIdNovedad() {
    return this.state._id;
  }
  //
  render() {
    return (
      <Container id="novedades-container">
        <Row>
          <Nav
            fill
            variant="tabs"
            defaultActiveKey="buscar"
            onSelect={(eventKey) => this.setState({ currentTab: eventKey })}
          >
            <Nav.Item>
              <Nav.Link eventKey="buscar">Buscar</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="crear">Crear</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          {this.state.currentTab === 'buscar' ? (
            <NovedadesBuscar
              changeTab={this.changeTab}
              setIdNovedad={this.setIdNovedad}
            />
          ) : this.state.currentTab === 'crear' ? (
            <NovedadesCrear changeTab={this.changeTab} />
          ) : (
            <NovedadesEditar
              changeTab={this.changeTab}
              getIdNovedad={this.getIdNovedad}
            />
          )}
        </Row>
      </Container>
    );
  }
}
