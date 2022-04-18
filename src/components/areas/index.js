import React from 'react';
import { Container, Nav, Row } from 'react-bootstrap';
import './areas.css';
import AreasBuscar from './crud/buscar';
import AreasCrear from './crud/crear';
import AreasEditar from './crud/editar';

export default class Areas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'buscar',
      _id: null,
    };
    this.changeTab = this.changeTab.bind(this);
    this.setIdArea = this.setIdArea.bind(this);
    this.getIdArea = this.getIdArea.bind(this);
  }
  
  changeTab(tab) {
    this.setState({ currentTab: tab });
  }

  setIdArea(id) {
    this.setState({ _id: id });
  }

  getIdArea() {
    return this.state._id;
  }
  
  render() {
    return (
      <Container id="areas-container">
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
              <Nav.Link eventKey="crear">Asignar</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          {this.state.currentTab === 'buscar' ? (
            <AreasBuscar
              changeTab={this.changeTab}
              setIdArea={this.setIdArea}
            />
          ) : this.state.currentTab === 'crear' ? (
            <AreasCrear changeTab={this.changeTab} />
          ) : (
            <AreasEditar
              changeTab={this.changeTab}
              getIdArea={this.getIdArea}
            />
          )}
        </Row>
      </Container>
    );
  }
}