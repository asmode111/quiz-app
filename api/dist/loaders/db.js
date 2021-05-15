"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const config_1 = __importDefault(require("../config"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = (new sqlite3_1.default.Database(config_1.default.databaseURL, sqlite3_1.default.OPEN_READWRITE));
    const sql = "SELECT id, question, question_body, question_raw, answers, correct_answer FROM zend_test_question ORDER BY id ASC LIMIT 1";
    db.get(sql, (err, row) => {
        if (err) {
            throw err;
        }
        console.log(row);
    });
});
//# sourceMappingURL=db.js.map