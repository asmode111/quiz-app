import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavigationButtons from './NavigationButtons';
import Answers from './Answers';

import './Question.css';

interface IQuestion {
  id: number;
  question: string;
  question_raw: string;
  answers: any;
  correct_answers: any;
}

function getEmptyQuestion(): IQuestion {
  return {
    id: 0,
    question: '',
    question_raw: '',
    answers: {},
    correct_answers: {}
  };
}

function Question() {
  const defaultQuestion:IQuestion = getEmptyQuestion();
  const [question, setQuestion]: [IQuestion, (question: IQuestion) => void] 
    = React.useState(defaultQuestion);
  const [selectedAnswers, setSelectedAnswers]: [any, (selectedAnswers: any) => void] = React.useState([]);

  React.useEffect(() => {
    axios.get<IQuestion>('http://localhost:8081/api/question', {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout : 1000
    }).then(response => {
      setQuestion(response.data);
      // setLoading(false);
    });
    // .catch(ex => {
    //   const error =
    //   ex.response.status === 404
    //     ? "Resource Not found"
    //     : "An unexpected error has occurred";
    //   setError(error);
    //   setLoading(false);
    // });
  }, []);

  function checkAnswer() {
    console.log(question.correct_answers);
    console.log(selectedAnswers);

    if (selectedAnswers.length !== question.correct_answers.length) {
      console.log('not success!');
      return;
    }

    const intersection = selectedAnswers.filter((x: string) => !question.correct_answers.includes(x));
    if (intersection.length != 0) {
      console.log('not success!');
      return;
    }

    console.log('success!');
  }
 
  return (
    <Container fluid className="container mt-5">
      <Row>
        <Col md={2}></Col>
        <Col>
          <Answers 
            question={question.question}
            answers={question.answers}
            correctAnswers={question.correct_answers}
            onSelectedAnswersChange={(selectedAnswers: any) => { setSelectedAnswers(selectedAnswers);} }
          />
          <NavigationButtons onNextClick={() => {checkAnswer();}} />
        </Col>
      </Row>
    </Container>
  );
}

export default Question;
