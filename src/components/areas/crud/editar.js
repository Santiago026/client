import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';
import ConfirmationPromprs from '../../prompts/confirmation';

export default class AreasEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idArea: this.props.getIdArea(),
      rediret: false,
      message: {
        text: '',
        show: false,
      },
      confirmation: {
        title: 'Modificar área',
        text: '¿Deseas modificar el área?',
        show: false,
      },
      loading: false,
      area: {
        asignatura: '',
        docente: '',        
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getArea();
  }

  getArea() {
    this.setState({ loading: true });
    request
      .get(`/areas/${this.state.idArea}`)
      .then((response) => {
        this.setState({
          area: response.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  setValue(index, value) {
    this.setState({
      area: {
        ...this.state.area,
        [index]: value,
      },
    });
  }

  guardarAreas() {
    this.setState({ loading: true });
    request
      .put(`/areas/${this.state.idArea}`, this.state.area)
      .then((response) => {
        if (response.data.exito) {
          this.setState({
            rediret: response.data.exito,
            message: {
              text: response.data.msg,
              show: true,
            },
          });
        }
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: true });
      });
  }

  onExitedMessage() {
    if (this.state.rediret) this.props.changeTab('buscar');
  }

  onCancel() {
    this.setState({
      confirmation: {
        ...this.state.confirmation,
        show: false,
      },
    });
  }

  onConfirm() {
    this.setState(
      {
        confirmation: {
          ...this.state.confirmation,
          show: false,
        },
      },
      this.guardarAreas()
    );
  }

  render() {
    return (
      <Container id="areas-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <ConfirmationPromprs
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Editar Áreas</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Asignatura</Form.Label>
              <Form.Control
                value={this.state.area.asignatura}
                onChange={(e) => this.setValue('asignatura', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Docente</Form.Label>
              <Form.Control
                value={this.state.area.docente}
                onChange={(e) => this.setValue('docente', e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() =>
                this.setState({
                  confirmation: { ...this.state.confirmation, show: true },
                })
              }
            >
              Guardar Área
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
