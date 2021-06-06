import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function NavigationButtons() {
  return (
    <Container>
      <Row className="d-flex align-items-center pt-3">
        <Col id="prev"> 
            <Button variant="primary">Previous</Button>{' '}
        </Col>
        <Col> 
            <Button variant="success">Next</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default NavigationButtons;
