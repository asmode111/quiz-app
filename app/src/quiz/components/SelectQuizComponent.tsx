import { ReactElement } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function SelectQuizComponent(props: any): ReactElement {

  const handleQuizTypeRandomSelectedQuiz = (): void => {
    props.onQuizTypeClicked(1);
  };

  const handleQuizTypeAllSelectedQuiz = (): void => {
    props.onQuizTypeClicked(2);
  };

  const handleQuizTypeEssaySelectedQuiz = (): void => {
    props.onQuizTypeClicked(3);
  };

  return (
    <Col>
      <Row className="pt-2">
        <Col>
          <Button onClick={handleQuizTypeRandomSelectedQuiz}>
            Random Selectable Quiz
          </Button>
        </Col>
      </Row>
      <Row className="pt-2">
        <Col>
          <Button onClick={handleQuizTypeAllSelectedQuiz}>
            All Selectable Quiz
          </Button>
        </Col>
      </Row>
      <Row className="pt-2">
        <Col>
          <Button onClick={handleQuizTypeEssaySelectedQuiz}>
            Essay Quiz
          </Button>
        </Col>
      </Row>
    </Col>
  );
}

export default SelectQuizComponent;