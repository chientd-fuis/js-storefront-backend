"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidateNumber = exports.checkValidateText = void 0;
function checkValidateText(value) {
    if (value) {
        return value;
    }
    throw new Error('Invalid parammetter!!!');
}
exports.checkValidateText = checkValidateText;
function checkValidateNumber(value) {
    if (value) {
        return value;
    }
    throw new Error('Invalid parammetter!!!');
}
exports.checkValidateNumber = checkValidateNumber;
