import React from 'react';
import { Container, Nav, Row } from 'react-bootstrap';
import DocentesBuscar from './crud/buscar';
import DocentesCrear from './crud/crear';
import DocentesEditar from './crud/editar';
import './docentes.css';

export default class Docentes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'buscar',
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdDocente = this.setIdDocente.bind(this);
    this.getIdDocente = this.getIdDocente.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdDocente(id) {
    this.setState({ _id: id });
  }

  getIdDocente() {
    return this.state._id;
  }
  //
  render() {
    return (
      <Container id="docentes-container">
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
              <Nav.Link eventKey="crear">Registrar</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          {this.state.currentTab === 'buscar' ? (
            <DocentesBuscar
              changeTab={this.changeTab}
              setIdDocente={this.setIdDocente}
            />
          ) : this.state.currentTab === 'crear' ? (
            <DocentesCrear changeTab={this.changeTab} />
          ) : (
            <DocentesEditar
              changeTab={this.changeTab}
              getIdDocente={this.getIdDocente}
            />
          )}
        </Row>
      </Container>
    );
  }
}
