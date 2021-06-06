import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

function NavigationButtons(props: any) {
  return (
    <Container>
      <Row className="d-flex align-items-end">
        {/* <Col id="prev"> 
            <Button variant="primary">Previous</Button>{' '}
        </Col> */}
          <Button onClick={props.onNextClick} variant="success">Next</Button>
      </Row>
    </Container>
  );
}

export default NavigationButtons;
