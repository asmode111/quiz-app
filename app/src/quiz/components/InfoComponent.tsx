import { ReactElement } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function InfoComponent(props: IInfoProps): ReactElement {
  return (
    <Col>
      <Row className="pt-2">
        <Col>{props.answeredQuestionCount} / {props.totalQuestionCount}</Col>
        <Col>Correct: {props.correctAnswersCount}</Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
        <hr />
      </Row>
    </Col>
  );
}

export default InfoComponent;