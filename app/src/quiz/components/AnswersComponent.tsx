import React, { ReactElement, ChangeEvent } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { IAnswersProps } from '../interfaces/IAnswersProps';

function AnswersComponent(props: IAnswersProps): ReactElement {
  const [selectedAnswers, setSelectedAnswers] = React.useState<any>([]);
  const isMultiple = props.correctAnswers.length > 1;

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let _selectedAnswers = selectedAnswers;
    if (isMultiple) {
      if (e.target.checked) {
        _selectedAnswers.push(e.target.value);
      } else {
        _selectedAnswers = selectedAnswers.filter(function (ele: string) {
          return ele != e.target.value;
        });
      }
    } else {
      _selectedAnswers = [e.target.value];
    }
    setSelectedAnswers(_selectedAnswers);
    props.onSelectedAnswersChange(_selectedAnswers);
  };

  const answers = [];
  for (const [key, answer] of Object.entries(props.answers)) {
    if (answer === null) {
      continue;
    }

    const elementKey = props.questionId + key;
    let answerElement = <input key={elementKey} disabled={props.isAnswered} type="radio" onChange={handleAnswerChange} value={key} name="selectedAnswers" />;
    if (isMultiple) {
      answerElement = <input key={elementKey} disabled={props.isAnswered} type="checkbox" onChange={handleAnswerChange} value={key} name="selectedAnswers" />;
    }

    answers.push(
      <Row key={key} className="pb-3">
        <label className="options">
          {answer}
          {answerElement}
          <span className="checkmark"></span>
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