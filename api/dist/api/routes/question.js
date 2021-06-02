"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = __importDefault(require("typedi"));
const QuestionService_1 = require("../services/QuestionService");
const questionService = typedi_1.default.get(QuestionService_1.QuestionService);
exports.default = (app) => {
    app.get("/question", (request, response) => {
        questionService.getFirstQuestion(function (result) {
            response.status(200).send(result).end();
        });
    });
    app.get("/question/:id", (request, response) => {
        const questionId = +request.params.id;
        questionService.getNextQuestion(questionId, function (result) {
            response.status(200).send(result).end();
        });
    });
};
//# sourceMappingURL=question.js.map