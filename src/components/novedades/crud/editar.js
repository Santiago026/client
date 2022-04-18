import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';
import ConfirmationPromprs from '../../prompts/confirmation';

export default class NovedadesEditar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idNovedad: this.props.getIdNovedad(),
      rediret: false,
      message: {
        text: '',
        show: false,
      },
      confirmation: {
        title: 'Modificar novedad',
        text: '¿Deseas modificar la novedad?',
        show: false,
      },
      loading: false,
      novedad: {
        docente: '',
        fundacion: '',
        descripcion: '',
        fecha: 0,
      },
    };
    this.onExitedMessage = this.onExitedMessage.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  componentDidMount() {
    this.getNovedad();
  }

  getNovedad() {
    this.setState({ loading: true });
    request
      .get(`/novedades/${this.state.idNovedad}`)
      .then((response) => {
        this.setState({
            novedad: response.data,
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
        novedad: {
        ...this.state.novedad,
        [index]: value,
      },
    });
  }

  guardarNovedades() {
    this.setState({ loading: true });
    request
      .put(`/novedades/${this.state.idNovedad}`, this.state.novedad)
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
      this.guardarNovedades()
    );
  }

  render() {
    return (
      <Container id="novedades-crear-container">
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
          <h1>Editar Novedades</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Docente</Form.Label>
              <Form.Control
                value={this.state.novedad.docente}
                onChange={(e) => this.setValue('docente', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fundación</Form.Label>
              <Form.Control
                value={this.state.novedad.fundacion}
                onChange={(e) => this.setValue('fundacion', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                value={this.state.novedad.descripcion}
                onChange={(e) => this.setValue('descripcion', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                value={this.state.novedad.fecha}
                onChange={(e) => this.setValue('fecha', e.target.value)}
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
              Guardar Novedad
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
