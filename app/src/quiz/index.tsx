import React from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import NavigationButtons from './NavigationButtons';
import Answers from './Answers';

import './Quiz.css';

interface IQuestion {
  id: number;
  question: string;
  question_raw: string;
  answers: any;
  correct_answers: any;
}

interface IAnswerResult {
  isAnswered: boolean;
  isCorrect: boolean;
  message: string;
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

function getEmptyAnswerResult(): IAnswerResult {
  return {
    isAnswered: false,
    isCorrect: false,
    message: ''
  };
}

function Question() {
  const [question, setQuestion]: [IQuestion, (question: IQuestion) => void] = React.useState(getEmptyQuestion());
  const [selectedAnswers, setSelectedAnswers]: [any, (selectedAnswers: any) => void] = React.useState([]);
  const [answerResult, setAnswerResult]: [IAnswerResult, (answerResult: IAnswerResult) => void] = React.useState(getEmptyAnswerResult());

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

  const checkAnswer = () => {
    const intersection = selectedAnswers.filter((x: string) => !question.correct_answers.includes(x));
    if (selectedAnswers.length !== question.correct_answers.length || intersection.length != 0) {
      setAnswerResult({
        isAnswered: true,
        isCorrect: false,
        message: 'Your answer is not correct! The correct answer is ' + question.correct_answers
      });
      return;
    }

    setAnswerResult({
      isAnswered: true,
      isCorrect: true,
      message: 'Your answer is correct!'
    });
  };

  const getNextQuestion = () => {
    axios.get<IQuestion>('http://localhost:8081/api/question/' + question.id, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout : 1000
    }).then(response => {
      setQuestion(response.data);
      setAnswerResult(getEmptyAnswerResult());
      setSelectedAnswers([]);
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
  };
 
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
            answerResult={answerResult}
          />
          <NavigationButtons 
            isAnswered={answerResult.isAnswered} 
            onAnswerClick={() => {checkAnswer();}} 
            onNextClick={() => {getNextQuestion();}} 
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Question;
