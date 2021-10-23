import { ReactElement } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

function AnswerResultComponent(props: any): ReactElement {
  if (!props.answerResult.isAnswered) {
    return <Col></Col>;
  }

  return (
    <Col>
      <Row className="pt-2">
        <Alert
          key="ansewrResult"
          variant={props.answerResult.isCorrect ? "success" : "danger"}>
          {props.answerResult.message}
        </Alert>
      </Row>
    </Col>
  );
}

export default AnswerResultComponent;