import axios from 'axios';

import { IQuestion } from '../interfaces/IQuestion';

export const getCurrentQuestion = (callback: (row: any) => void): void => {
  const currentQuestion = localStorage.getItem('currentQuestion');
  if (currentQuestion) {
    callback(JSON.parse(currentQuestion));
  } else {
    axios.get<IQuestion>('http://localhost:8081/api/question', {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 1000
    }).then(response => {
      setCurrentQuestion(response.data);
      callback(response.data);
    });
  }
};

export const setCurrentQuestion = (data: any): void => {
  localStorage.setItem('currentQuestion', JSON.stringify(data));
};

export const loadNextQuestion = (questionId: number, callback: (row: any) => void): void => {
  axios.get<IQuestion>('http://localhost:8081/api/question/' + questionId, {
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 1000
  }).then(response => {
    setCurrentQuestion(response.data);

    callback(response.data);
  });
};
