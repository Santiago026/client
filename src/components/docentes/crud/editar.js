import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';
import ConfirmationPromprs from '../../prompts/confirmation';

export default class DocentesEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idDocente: this.props.getIdDocente(),
      rediret: false,
      message: {
        text: '',
        show: false,
      },
      confirmation: {
        title: 'Modificar docente',
        text: '¿Deseas modificar el docente?',
        show: false,
      },
      loading: false,
      docente: {
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        direccion: '',
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getDocente();
  }

  getDocente() {
    this.setState({ loading: true });
    request
      .get(`/docentes/${this.state.idDocente}`)
      .then((response) => {
        this.setState({
          docente: response.data,
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
      docente: {
        ...this.state.docente,
        [index]: value,
      },
    });
  }

  guardarDocentes() {
    this.setState({ loading: true });
    request
      .put(`/docentes/${this.state.idDocente}`, this.state.docente)
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
      this.guardarDocentes()
    );
  }

  render() {
    return (
      <Container id="docentes-crear-container">
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
          <h1>Editar Docentes</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                value={this.state.docente.nombre}
                onChange={(e) => this.setValue('nombre', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                value={this.state.docente.apellido}
                onChange={(e) => this.setValue('apellido', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                value={this.state.docente.telefono}
                onChange={(e) => this.setValue('telefono', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={this.state.docente.email}
                onChange={(e) => this.setValue('email', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Dirreción</Form.Label>
              <Form.Control
                value={this.state.docente.direccion}
                onChange={(e) => this.setValue('direccion', e.target.value)}
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
              Guardar Docente
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
