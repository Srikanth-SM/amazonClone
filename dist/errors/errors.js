"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var validationErrors = function validationErrors(err, req, res, next) {
  console.log("Inside validation errors", err);
  res.status(500).send({
    error: err.message,
    stack: err.stack,
    code: err.code
  });
};

var _default = {
  validationErrors: validationErrors
};
exports.default = _default;