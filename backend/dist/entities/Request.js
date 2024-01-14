"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dbConfig_1 = __importDefault(require("../dbConfig"));
var sequelize_1 = __importDefault(require("sequelize"));
var Request = dbConfig_1.default.define("Request", {
    RequestId: {
        type: sequelize_1.default.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    StudentId: {
        type: sequelize_1.default.INTEGER,
        allowNull: false,
        references: {
            model: 'Students',
            key: 'StudentId' // foreign key
        }
    },
    RequestStatus: {
        type: sequelize_1.default.STRING,
        values: ['APPROVED', 'PENDING', 'REJECTED'],
        allowNull: false,
        validate: {
            isIn: [['APPROVED', 'PENDING', 'REJECTED']],
        }
    },
    SignedDocument: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
});
exports.default = Request;
