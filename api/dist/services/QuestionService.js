"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const QuestionRepository_1 = require("../repositories/QuestionRepository");
const questionRepository = new QuestionRepository_1.QuestionRepository();
class QuestionService {
    getFirstQuestion(db, callback) {
        return questionRepository.getFirstQuestion(db, callback);
    }
    getNextQuestion(db, questionId, callback) {
        return questionRepository.getNextQuestion(db, questionId, callback);
    }
}
exports.QuestionService = QuestionService;
//# sourceMappingURL=QuestionService.js.map