import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function AnswerAlert(props: any) {

  if (!props.answerResult.isAnswered) {
    return (null);
  }

  return (
    <Col>
      <Row className="pt-2">
        <Alert 
          key="ansewrResult" 
          variant={props.answerResult.isCorrect ? 'success' : 'danger'}>
            {props.answerResult.message}
        </Alert>
      </Row>
    </Col>
  );
}

export default AnswerAlert;
