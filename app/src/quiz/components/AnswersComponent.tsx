import { ReactElement, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { setSelectedAnswers, removeSelectedAnswer } from "../slices/selectedAnswersSlice";

function AnswersComponent(props: IAnswersProps): ReactElement {
  const dispatch = useDispatch();
  const isMultiple = props.correctAnswers.length > 1;

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (isMultiple) {
      if (e.target.checked) {
        dispatch(setSelectedAnswers(e.target.value));
      } else {
        dispatch(removeSelectedAnswer(e.target.value));
      }
    } else {
      dispatch(setSelectedAnswers(e.target.value));
    }

    props.onIsAnswerSelected();
  };

  const answers = [];
  for (const [key, answer] of Object.entries(props.answers)) {
    if (answer === null) {
      continue;
    }

    const elementKey = props.questionId + key;
    let answerElement = <input key={elementKey} className="checkmark" disabled={props.isAnswered} type="radio" onChange={handleAnswerChange} value={key} name="selectedAnswers2" />;
    if (isMultiple) {
      answerElement = <input key={elementKey} className="checkmark" disabled={props.isAnswered} type="checkbox" onChange={handleAnswerChange} value={key} name="selectedAnswers2" />;
    }

    answers.push(
      <Row key={key} className="pb-3">
        <label className="options">
          {key} )
          {answerElement}
          {answer}
        </label>
      </Row>
    );
  }

  return (
    <Col>
      <Row>
        <Col md={1}></Col>
        <Col>{answers}</Col>
      </Row>
    </Col>
  );
}

export default AnswersComponent;