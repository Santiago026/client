import React from 'react';
import { request } from '../../helper/helper';
import { Container, Row } from 'react-bootstrap';
import '../areas.css';
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
  ];

export default class AreasBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      idArea: null,
      confirmation: {
        title: 'Eliminar el área',
        text: '¿Deseas eliminar el área?',
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
    this.props.setIdArea(row._id);

    this.props.changeTab('editar');
  }

  onClickDeleteButton(row) {
    this.setState({
      idArea: row._id,
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
      this.eliminarArea()
    );
  }

  eliminarArea() {
    this.setState({ loading: true });
    request
      .delete(`/areas/${this.state.idArea}`)
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
      <Container id="areas-buscar-container">
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
          <h1>Consultar Áreas</h1>
        </Row>
        <Row>
          <DataGrid
            url="/areas"
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
