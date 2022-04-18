import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';

export default class DocentesCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rediret: false,
      message: {
        text: '',
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
      .post('/docentes', this.state.docente)
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
      <Container id="docentes-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Registrar Docente</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('nombre', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('apellido', e.target.value)}
              />
            </Form.Group>            

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('telefono', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Email</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('email', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Dirrecion</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('direccion', e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => console.log(this.guardarDocentes())}
            >
              Guardar Docente
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
