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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRepository = void 0;
const typedi_1 = require("typedi");
const db_1 = require("../../loaders/db");
let QuestionRepository = class QuestionRepository {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
        this.connection = this.dbConnection.getConnection();
    }
    getFirstQuestion(callback) {
        const sql = "SELECT id, question, question_body, question_raw, answers, correct_answer FROM zend_test_question ORDER BY id ASC LIMIT 1";
        this.connection.get(sql, (err, row) => {
            if (err) {
                throw err;
            }
            callback(row);
        });
    }
    getNextQuestion(questionId, callback) {
        const sql = `SELECT id, question, question_body, question_raw, answers, correct_answer 
                FROM zend_test_question 
                WHERE id > ?
                ORDER BY id ASC
                LIMIT 1`;
        this.connection.get(sql, [questionId], (err, row) => {
            if (err) {
                throw err;
            }
            callback(row);
        });
    }
};
QuestionRepository = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [db_1.DbConnection])
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