import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function Question(props: any) {
  return (
    <Col>
      <Row className="pt-2">
        <Col className="py-2 h5">Q. {props.question}</Col>
      </Row>
      {props.questionBody
        && <Row className="pb-2">
          <Col>
            <Alert variant="info">
              <code>{props.questionBody}</code>
            </Alert>
          </Col>
        </Row>
      }
    </Col>
  );
}

export default Question;
