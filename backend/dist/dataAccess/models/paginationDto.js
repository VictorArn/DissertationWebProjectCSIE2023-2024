"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var paginationDto = /** @class */ (function () {
    function paginationDto() {
    }
    paginationDto.prototype.setTakeAndSkip = function (take, skip) {
        this.take = take != null ? Number(take) : null;
        this.skip = skip != null ? Number(skip) : null;
    };
    return paginationDto;
}());
exports.default = paginationDto;
