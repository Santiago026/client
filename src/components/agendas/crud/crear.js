import React from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import { request } from '../../helper/helper';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';

export default class AgendasCrear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rediret: false,
      message: {
        text: '',
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
      .post('/agendas', this.state.agenda)
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
      <Container id="agendas-crear-container">
        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Programar Clases</h1>
        </Row>
        <Row>
          <Form>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Asignatura</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('asignatura', e.target.value)}
              />
            </Form.Group>

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
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('fecha', e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Horario</Form.Label>
              <Form.Control
                onChange={(e) => this.setValue('horario', e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={() => console.log(this.guardarAgendas())}
            >
              Guardar Clase
            </Button>
          </Form>
        </Row>
      </Container>
    );
  }
}
