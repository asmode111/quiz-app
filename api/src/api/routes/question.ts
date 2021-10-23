import { Router, Request, Response } from "express";
import Container from "typedi";

import { QuestionService } from "../services/QuestionService";
const questionService = Container.get(QuestionService);

export default (app: Router) => {
  app.get("/question", (request: Request, response: Response) => {
    questionService.getFirstQuestion(function (result) {
      response.status(200).send(result).end();
    });
  });

  app.get("/question/random", (request: Request, response: Response) => {
    const excludedQuestionIds: any = request.query.excludedQuestionIds;
    const questionType: any = request.query.questionType;
    questionService.getRandomQuestion(excludedQuestionIds, questionType, function (result) {
      response.status(200).send(result).end();
    });
  });

  app.get("/question/:id", (request: Request, response: Response) => {
    const questionId: number = +request.params.id;
    questionService.getNextQuestion(questionId, function (result) {
      response.status(200).send(result).end();
    });
  });

  app.get("/total-question-count", (request: Request, response: Response) => {
    questionService.getTotalQuestionCount(function (result: number) {
      response.status(200).send(result.toString()).end();
    });
  });
};