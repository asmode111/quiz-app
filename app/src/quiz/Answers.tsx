import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function Answers(props: any) {
  const [selectedAnswers, setSelectedAnswers]: [any, (selectedAnswers: any) => void] = React.useState([]);
  const isMultiple = props.correctAnswers.length > 1;

  const handleAnswerChange = (e: any) => {
    let _selectedAnswers = selectedAnswers;
    if (isMultiple) {
      if (e.target.checked) {
        _selectedAnswers.push(e.target.value);
      } else {
        _selectedAnswers = selectedAnswers.filter(function(ele: string){ 
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

    let answerElement = <input type="radio" onChange={handleAnswerChange} value={key} name="selectedAnswers" />;
    if (isMultiple) {
      answerElement = <input type="checkbox" onChange={handleAnswerChange} value={key} name="selectedAnswers" />;
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
    <Container>
      <Col>
        {
          props.answerResult.isAnswered 
            && <Row className="question pt-2">
                <Alert 
                key="ansewrResult" 
                variant={props.answerResult.isCorrect ? 'success' : 'danger'}>
                  {props.answerResult.message}
                </Alert>
              </Row>
        }
        <Row className="question ml-sm-5 pl-sm-5 pt-2">
            <Col className="py-2 h5">Q. {props.question}</Col>
        </Row>
        <Row>
          <Col md={1}></Col>
          <Col>{answers}</Col>
        </Row>
      </Col>
    </Container>
  );
}

export default Answers;
