import React from 'react';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Question.css';

interface IQuestion {
  id: number;
  question: string;
  question_raw: string;
  answers: object;
  correct_answers: object;
}

function Question(props: any) {

  const answers = []
  for (const [key, answer] of Object.entries(props.question.answers)) {
    if (answer === null) {
      continue;
    }

    answers.push(
      <Row key={key} className="pb-3">
        <label className="options">
          {answer}
          <input type="radio" name="radio" />
          <span className="checkmark"></span> 
        </label> 
      </Row>
    )
  }

  return (
    <Container fluid className="container mt-5">
      <Row>
        <Col md={2}></Col>
        <Col>
          <Row className="question ml-sm-5 pl-sm-5 pt-2">
            <Col className="py-2 h5">Q. {props.question.question}</Col>
          </Row>
          <Row>
            <Col md={1}></Col>
            <Col>
              {answers}
            </Col>
          </Row>
          <Row className="d-flex align-items-center pt-3">
            <Col id="prev"> 
              <Button variant="primary">Previous</Button>{' '}
            </Col>
            <Col> 
              <Button variant="success">Next</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Question;
