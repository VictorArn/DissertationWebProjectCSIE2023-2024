"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig_1 = __importDefault(require("../dbConfig"));
var sequelize_1 = __importDefault(require("sequelize"));
var Session = dbConfig_1.default.define("Session", {
    SessionId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    SessionName: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    SessionStartDate: {
        type: sequelize_1.default.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    SessionEndDate: {
        type: sequelize_1.default.DATE,
        allowNull: false,
        validate: {
            isDate: true
        }
    },
    maxRequestsAllowed: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    ProfessorId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        references: {
            model: 'Professors',
            key: 'ProfessorId' // foreign key
        }
    },
});
exports.default = Session;
