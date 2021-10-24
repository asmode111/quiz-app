import { ReactElement, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import { setEssayAnswer } from "../../slices/essayAnswerSlice";

function EssayAnswersComponent(props: IAnswersProps): ReactElement {
  const dispatch = useDispatch();
  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setEssayAnswer(e.target.value));
    props.onIsAnswerSelected();
  };

  return (
    <Col>
      <Row className="pb-3">
        <Form.Control 
          key={props.questionId}
          as="textarea" 
          rows={3}
          onChange={handleAnswerChange}
        />
      </Row>
    </Col>
  );
}

export default EssayAnswersComponent;