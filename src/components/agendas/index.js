import React from 'react';
import { Container, Nav, Row } from 'react-bootstrap';
import AgendasBuscar from './crud/buscar';
import AgendasCrear from './crud/crear';
import AgendasEditar from './crud/editar';
import './agendas.css';

export default class Agendas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'buscar',
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdAgenda = this.setIdAgenda.bind(this);
    this.getIdAgenda = this.getIdAgenda.bind(this);
  }

  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdAgenda(id) {
    this.setState({ _id: id });
  }

  getIdAgenda() {
    return this.state._id;
  }
  //
  render() {
    return (
      <Container id="agendas-container">
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
            <AgendasBuscar
              changeTab={this.changeTab}
              setIdAgenda={this.setIdAgenda}
            />
          ) : this.state.currentTab === 'crear' ? (
            <AgendasCrear changeTab={this.changeTab} />
          ) : (
            <AgendasEditar
              changeTab={this.changeTab}
              getIdAgenda={this.getIdAgenda}
            />
          )}
        </Row>
      </Container>
    );
  }
}
