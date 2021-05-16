"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRepository = void 0;
const typedi_1 = require("typedi");
let QuestionRepository = class QuestionRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }
    getFirstQuestion(callback) {
        callback([]);
        // const sql = "SELECT id, question, question_body, question_raw, answers, correct_answer FROM zend_test_question ORDER BY id ASC LIMIT 1";
        // this.dbConnection.get(sql, (err: any, row: any) => {
        //   if (err) {
        //     throw err;
        //   }
        //   callback(row);
        // });
    }
    getNextQuestion(questionId, callback) {
        callback([]);
        // const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
        //             FROM zend_test_question 
        //             WHERE id > ?
        //             ORDER BY id ASC
        //             LIMIT 1`;
        // this.dbConnection.get(sql, [questionId], (err: any, row: any) => {
        //   if (err) {
        //     throw err;
        //   }
        //   callback(row);
        // });
    }
};
QuestionRepository = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject("dbConnection")),
    __metadata("design:paramtypes", [Object])
], QuestionRepository);
exports.QuestionRepository = QuestionRepository;
// const getFirstQuestion = function (db) {
//   const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
//               FROM zend_test_question 
//               ORDER BY id ASC
//               LIMIT 1`;
//   db.get(sql, (err, row) => {
//     if (err) {
//       throw err;
//     }
//     return row;
//   });
// };
// const getNextQuestion = function (db, questionId) {
//   const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
//               FROM zend_test_question 
//               WHERE id > ?
//               ORDER BY id ASC
//               LIMIT 1`;
//   db.get(sql, [questionId], (err, row) => {
//     if (err) {
//       throw err;
//     }
//     return row;
//   });
// };
// module.exports = {
//   getFirstQuestion,
//   getNextQuestion
// };
//# sourceMappingURL=QuestionRepository.js.map