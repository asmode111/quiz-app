import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Answers(props: any) {

  let [selectedAnswers, setSelectedAnswers]: [any, (question: any) => void] = React.useState([]);

  function handleAnswerChange(e: any) {
    if (e.target.checked) {
      selectedAnswers.push(e.target.value);
      setSelectedAnswers(selectedAnswers);
    } else {
      selectedAnswers = selectedAnswers.filter(function(ele: string){ 
        return ele != e.target.value;
      });
      setSelectedAnswers(selectedAnswers);
    }

    console.log("selectedAnswers", selectedAnswers);
  }


  const answers = []
  const isMultiple = false;
  // const isMultiple = props.correctAnswers.length > 1;

  for (const [key, answer] of Object.entries(props.answers)) {
    if (answer === null) {
      continue;
    }

    let answerElement = <input type="radio" onChange={handleAnswerChange} value={key} name="selectedAnswers" />
    if (isMultiple) {
      answerElement = <input type="checkbox" onChange={handleAnswerChange} value={key} name="selectedAnswers" />
    }

    answers.push(
      <Row key={key} className="pb-3">
        <label className="options">
          {answer}
          {answerElement}
          <span className="checkmark"></span> 
        </label> 
      </Row>
    )
  }

  return (
    <Container>
      <Col>
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
