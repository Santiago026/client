import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';

export default class NovedadesCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rediret: false,
      message: {
        text: '',
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
      .post('/novedades', this.state.novedad)
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

  render() {
    return (
      <Container id="novedades-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Crear Novedades</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Docente</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('docente', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fundación</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('fundacion', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('descripcion', e.target.value)}
              />
            </Form.Group> 

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('fecha', e.target.value)}
              />
            </Form.Group>            

            <Button
              variant="primary"
              onClick={() => console.log(this.guardarNovedades())}
            >
              Guardar Novedad
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
