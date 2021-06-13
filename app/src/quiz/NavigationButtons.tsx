import React from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

function NavigationButtons(props: any) {
  return (
    <Row>
      {
        !props.isAnswered && <Button onClick={props.onAnswerClick} disabled={!props.isAnswerSelected} className="btn-lg btn-block" variant="success">Answer</Button>
      }
      {
        props.isAnswered && <Button onClick={props.onNextClick} className="btn-lg btn-block" variant="warning">Next</Button>
      }
    </Row>
  );
}

export default NavigationButtons;