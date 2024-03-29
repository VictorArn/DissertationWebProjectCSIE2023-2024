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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRequest = exports.getRequestByProfessorId = exports.getProfessor = exports.getRequestByStudentId = exports.getProfessorByEmail = exports.deleteRequests = exports.getFilteredRequests = exports.createRequest = exports.getRequest = exports.getRequestById = void 0;
var dbConfig_1 = __importDefault(require("../dbConfig"));
var Professor_1 = __importDefault(require("../entities/Professor"));
var Request_1 = __importDefault(require("../entities/Request"));
var operators_1 = require("./operators");
function getRequest() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Request_1.default.findAll({ include: ["Requests"] })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getRequest = getRequest;
function getProfessor() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Professor_1.default.findAll()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getProfessor = getProfessor;
function getRequestById(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Request_1.default.findByPk(id, { include: ["Requests"] })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.getRequestById = getRequestById;
function createRequest(professor) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Request_1.default.create(professor, { include: [{ model: Professor_1.default, as: "Request" }] })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.createRequest = createRequest;
function getProfessorByEmail(professorEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Professor_1.default.findAll({ where: { ProfessorEmail: professorEmail } })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error in getProfessorByRequest(:', error_1);
                    throw new Error('Error fetching Professor by request');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getProfessorByEmail = getProfessorByEmail;
;
function getRequestByProfessorId(ProfessorId) {
    return __awaiter(this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Request_1.default.findAll({ where: { ProfessorId: ProfessorId } })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error in getRequestByProfessorId:', error_2);
                    throw new Error('Error fetching request by Professor ID');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getRequestByProfessorId = getRequestByProfessorId;
function getRequestByStudentId(StudentId) {
    return __awaiter(this, void 0, void 0, function () {
        var error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Request_1.default.findAll({ where: { StudentId: StudentId } })];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error in getRequestByStudentId:', error_3);
                    throw new Error('Error fetching request by Student ID');
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getRequestByStudentId = getRequestByStudentId;
function getFilteredRequests(RequestFilter) {
    return __awaiter(this, void 0, void 0, function () {
        var whereClause;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!RequestFilter.take)
                        RequestFilter.take = 10;
                    if (!RequestFilter.skip)
                        RequestFilter.skip = 0;
                    whereClause = {};
                    if (RequestFilter.RequestId)
                        whereClause.RequestId = (_a = {}, _a[operators_1.Like] = "%".concat(RequestFilter.RequestId, "%"), _a);
                    return [4 /*yield*/, Request_1.default.findAndCountAll({
                            distinct: true,
                            where: whereClause,
                            limit: RequestFilter.take,
                            offset: RequestFilter.skip * RequestFilter.take,
                        })];
                case 1: return [2 /*return*/, _b.sent()];
            }
        });
    });
}
exports.getFilteredRequests = getFilteredRequests;
function deleteRequests(id) {
    return __awaiter(this, void 0, void 0, function () {
        var deleteElem;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Request_1.default.findByPk(id)];
                case 1:
                    deleteElem = _a.sent();
                    if (!deleteElem) {
                        console.log("This element does not exist, so it cannot be deleted");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, deleteElem.destroy()];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.deleteRequests = deleteRequests;
function updateRequest(request, id) {
    return __awaiter(this, void 0, void 0, function () {
        var findRequest, t, existProfessor, ProfessorIds, ProffessorIdsDeleted, insertedA, updatedA, _i, updatedA_1, item, findA, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getRequestById(request.RequestId)];
                case 1:
                    findRequest = _a.sent();
                    if (!findRequest) {
                        console.log("This request does not exist");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, dbConfig_1.default.transaction()];
                case 2:
                    t = _a.sent();
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 16, , 18]);
                    return [4 /*yield*/, findRequest.update(request)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, Professor_1.default.findAll({
                            where: {
                                ProfessorId: request.ProfessorId,
                            },
                        })];
                case 5:
                    existProfessor = _a.sent();
                    if (!(existProfessor.length > 0)) return [3 /*break*/, 7];
                    ProfessorIds = existProfessor.map(function (a) { return a.dataValues.ProfessorId; });
                    ProffessorIdsDeleted = ProfessorIds.filter(function (id) { var _a; return !((_a = request.Professors.find(function (add) { return add.ProfessorId === id; })) === null || _a === void 0 ? void 0 : _a.ProfessorId); });
                    if (!(ProffessorIdsDeleted.length > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, Request_1.default.destroy({
                            where: {
                                ProfessorId: ProffessorIdsDeleted,
                            },
                        })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    insertedA = request.Professors.filter(function (a) { return a.ProfessorId === 0; });
                    if (!(insertedA.length > 0)) return [3 /*break*/, 9];
                    return [4 /*yield*/, Professor_1.default.bulkCreate(insertedA)
                        // updated
                    ];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    updatedA = request.Professors.filter(function (a) { return a.ProfessorId !== 0; });
                    if (!(updatedA.length > 0)) return [3 /*break*/, 14];
                    _i = 0, updatedA_1 = updatedA;
                    _a.label = 10;
                case 10:
                    if (!(_i < updatedA_1.length)) return [3 /*break*/, 14];
                    item = updatedA_1[_i];
                    return [4 /*yield*/, Professor_1.default.findByPk(item.ProfessorId)];
                case 11:
                    findA = _a.sent();
                    return [4 /*yield*/, (findA === null || findA === void 0 ? void 0 : findA.update(item))];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13:
                    _i++;
                    return [3 /*break*/, 10];
                case 14: return [4 /*yield*/, t.commit()];
                case 15:
                    _a.sent();
                    return [3 /*break*/, 18];
                case 16:
                    e_1 = _a.sent();
                    return [4 /*yield*/, t.rollback()];
                case 17:
                    _a.sent();
                    throw e_1;
                case 18: return [2 /*return*/];
            }
        });
    });
}
exports.updateRequest = updateRequest;
