import React , { Component } from 'react';
import { Container,Spinner } from 'react-bootstrap';
import './loading.css';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.show !== this.state.show)
      this.setState({ show: nextProps.show });
  }

  render() {
    return (
      <div>
      {this.state.show ? (
        <Container id="loading-container">
        
        <div id="loading-backdrop">
          <Spinner  className="ring" animation="border" size="sm" />
          <Spinner className="ring" animation="border" size="sm" />
          <Spinner className="ring" animation="border" size="sm" />
          <p>Loading...</p>
          
        </div>
        </Container>

      ):null}
      </div>
      
    );
  }
}
