import { ReactElement } from "react";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function NavigationButtonsComponent(props: INavigationButtonsComponentProps): ReactElement {
  return (
    <Row>
      <Col>
        {
          <Button
            onClick={props.onAnswerClick}
            disabled={props.isAnswered}
            className="btn-block w-100"
            variant="warning">
            Answer
          </Button>
        }
      </Col>
      <Col>
        {
          <Button
            onClick={props.onNextClick}
            className="btn-block w-100"
            variant="success">
            Next
          </Button>
        }
      </Col>
    </Row>);
}

export default NavigationButtonsComponent;