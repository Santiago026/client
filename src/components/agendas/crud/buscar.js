import React from 'react';
import { request } from '../../helper/helper';
import { Container, Row } from 'react-bootstrap';
import '../agendas.css';
import DataGrid from '../../grid/grid';
import ConfirmationPromprs from '../../prompts/confirmation';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';


const columns = [
  {
    dataField: '_id',
    text: 'ID',
    hidden: true,
  },
  {
    dataField: 'asignatura',
    text: 'Asignatura',
  },
  {
    dataField: 'docente',
    text: 'Docente',
  },
  {
    dataField: 'fundacion',
    text: 'Fundación',
  },
  {
    dataField: 'fecha',
    text: 'Fecha',
  },
  {
    dataField: 'horario',
    text: 'Horario',
  },
];

export default class AgendasBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      idAgenda: null,
      confirmation: {
        title: 'Eliminar clase',
        text: '¿Deseas eliminar la clase?',
        show: false,
      },
      message: {
        text: '',
        show: false,
      },
    };

    this.onClickEditButton = this.onClickEditButton.bind(this);
    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onClickEditButton(row) {
    this.props.setIdAgenda(row._id);

    this.props.changeTab('editar');
  }

  onClickDeleteButton(row) {
    this.setState({
      idAgenda: row._id,
      confirmation: {
        ...this.state.confirmation,
        show: true,
      },
    });
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
      this.eliminarAgenda()
    );
  }

  eliminarAgenda() {
    this.setState({ loading: true });
    request
      .delete(`/agendas/${this.state.idAgenda}`)
      .then((response) => {
        this.setState({
          loading: false,
          message: {
            text: response.data.msg,
            show: true,
          },
        });
        if(response.data.exito) {
          this.reloadPage();
        }
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 2500);
  }

  render() {
    return (
      <Container id="agendas-buscar-container">
        <ConfirmationPromprs
          show={this.state.confirmation.show}
          title={this.state.confirmation.title}
          text={this.state.confirmation.text}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
        />

        <MessagePrompt
          text={this.state.message.text}
          show={this.state.message.show}
          duration={2500}
          onExited={this.onExitedMessage}
        />

        <Loading show={this.state.loading} />

        <Row>
          <h1>Buscar Clase</h1>
        </Row>
        <Row>
          <DataGrid
            url="/agendas"
            columns={columns}
            showEditButton={true}
            showDeleteButton={true}
            onClickEditButton={this.onClickEditButton}
            onClickDeleteButton={this.onClickDeleteButton}
          />
        </Row>
      </Container>
    );
  }
}
