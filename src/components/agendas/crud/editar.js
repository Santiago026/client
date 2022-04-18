import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';
import ConfirmationPromprs from '../../prompts/confirmation';

export default class AgendasEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idAgenda: this.props.getIdAgenda(),
      rediret: false,
      message: {
        text: '',
        show: false,
      },
      confirmation: {
        title: 'Modificar clase',
        text: '¿Deseas modificar la clase?',
        show: false,
      },
      loading: false,
      agenda: {
        asignatura: '',
        docente: '',
        fundacion: '',
        fecha: '',
        horario: '',
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getAgenda();
  }

  getAgenda() {
    this.setState({ loading: true });
    request
      .get(`/agendas/${this.state.idAgenda}`)
      .then((response) => {
        this.setState({
          agenda: response.data,
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
        agenda: {
        ...this.state.agenda,
        [index]: value,
      },
    });
  }

  guardarAgendas() {
    this.setState({ loading: true });
    request
      .put(`/agendas/${this.state.idAgenda}`, this.state.agenda)
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
      this.guardarAgendas()
    );
  }

  render() {
    return (
      <Container id="agendas-crear-container">
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
          <h1>Editar Clase</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Asignatura</Form.Label>
              <Form.Control
                value={this.state.agenda.asignatura}
                onChange={(e) => this.setValue('asignatura', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Docente</Form.Label>
              <Form.Control
                value={this.state.agenda.docente}
                onChange={(e) => this.setValue('docente', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fundación</Form.Label>
              <Form.Control
                value={this.state.agenda.fundacion}
                onChange={(e) => this.setValue('fundacion', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                value={this.state.agenda.fecha}
                onChange={(e) => this.setValue('fecha', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Horario</Form.Label>
              <Form.Control
                value={this.state.agenda.horario}
                onChange={(e) => this.setValue('horario', e.target.value)}
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
              Guardar Clase
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
