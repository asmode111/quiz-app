import React from 'react';
import axios from 'axios';

import Question from './question';

interface IQuestion {
  id: number;
  question: string;
  question_raw: string;
  answers: object;
  correct_answers: object;
}

function getEmptyQuestion(): IQuestion {
  return {
    id: 0,
    question: '',
    question_raw: '',
    answers: {},
    correct_answers: {}
  }
}

function App() {
  const defaultQuestion:IQuestion = getEmptyQuestion();

  const [question, setQuestion]: [IQuestion, (question: IQuestion) => void] 
    = React.useState(defaultQuestion);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  React.useEffect(() => {
    axios.get<IQuestion>("http://localhost:8081/api/question", {
      headers: {
        "Content-Type": "application/json"
      },
      timeout : 1000
    }).then(response => {
      setQuestion(response.data);
      setLoading(false);
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

  return <Question question={question}></Question>
}

export default App;
