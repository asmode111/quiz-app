import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavigationButtons from './NavigationButtons';
import Answers from './Answers';

import './Question.css';

function Question(props: any) {
  return (
    <Container fluid className="container mt-5">
      <Row>
        <Col md={2}></Col>
        <Col>
          <Answers 
            question={props.question.question}
            answers={props.question.answers}
            correctAnswers={props.question.correct_answers} 
          />
          <NavigationButtons />
        </Col>
      </Row>
    </Container>
  );
}

export default Question;
