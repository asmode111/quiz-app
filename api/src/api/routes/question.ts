import { Router, Request, Response } from 'express';
// import middlewares from '../middlewares';
const route = Router();

import { QuestionService } from "../services/QuestionService";
const questionService = new QuestionService();

export default (app: Router) => {
  app.get("/api/question", (request: Request, response: Response) => {
    questionService.getFirstQuestion(db, function(row) {
        response.status(200).send(row).end();
  });
});

  // route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
  //   return res.json({ user: req.currentUser }).status(200);
  // });
};


// app.get("/api/question", (request: express.Request, response: express.Response) => {
//   questionService.getFirstQuestion(db, function(row) {
//     response.status(200).send(row).end();
//   });
// });

// app.get("/api/question/:id", (request: express.Request, response: express.Response) => {
//   const questionId: number = +request.params.id;
//   questionService.getNextQuestion(db, questionId, function(row) {
//     response.status(200).send(row).end();
//   });
// });