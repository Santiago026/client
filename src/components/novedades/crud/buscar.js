import React from 'react';
import { request } from '../../helper/helper';
import { Container, Row } from 'react-bootstrap';
import '../novedades.css';
import DataGrid from '../../grid/grid';
import ConfirmationPromprs from '../../prompts/confirmation';
import Loading from '../../loading/loading';
import MessagePrompt from '../../prompts/message';


const columns = [
  {
    dataField: '_id',
    text: 'Product ID',
    hidden: true,
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
    dataField: 'descripcion',
    text: 'Descripción',
  },
  {
    dataField: 'fecha',
    text: 'Fecha',
  },
];

export default class NovedadesBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      idNovedad: null,
      confirmation: {
        title: 'Eliminar Novedad',
        text: '¿Deseas eliminar la Novedad?',
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
    this.props.setIdNovedad(row._id);

    this.props.changeTab('editar');
  }

  onClickDeleteButton(row) {
    this.setState({
      idNovedad: row._id,
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
      this.eliminarNovedad()
    );
  }

  eliminarNovedad() {
    this.setState({ loading: true });
    request
      .delete(`/novedades/${this.state.idNovedad}`)
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
      <Container id="novedades-buscar-container">
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
          <h1>Buscar novedades</h1>
        </Row>
        <Row>
          <DataGrid
            url="/novedades"
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
