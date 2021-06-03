import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';

function App() {
  return (
    <Container fluid className="container mt-5">
      <Row>
        <Col md={2}></Col>
        <Col>
          <Row className="question ml-sm-5 pl-sm-5 pt-2">
            <Col className="py-2 h5">Q. which option best describes your job role?</Col>
          </Row>
          <Row>
            <Col md={1}></Col>
            <Col>
              <Row>
                <label className="options">
                  Small Business Owner or Employee 
                  <input type="radio" name="radio" />
                  <span className="checkmark"></span> 
                </label> 
              </Row>
              <Row>
                <label className="options">
                  Nonprofit Owner or Employee 
                  <input type="radio" name="radio" />
                  <span className="checkmark"></span> 
                </label> 
              </Row>
              <Row>
                <label className="options">
                  Journalist or Activist 
                  <input type="radio" name="radio" /> 
                  <span className="checkmark"></span> 
                </label> 
              </Row>
            </Col>
          </Row>
          <Row className="d-flex align-items-center pt-3">
            <Col id="prev"> 
              <Button variant="primary">Previous</Button>{' '}
            </Col>
            <Col> 
              <Button variant="success">Next</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
