var validationErrors = function(err, req, res, next) {
  console.log("Inside validation errors", err);

  res
    .status(500)
    .send({ error: err.message, stack: err.stack, code: err.code });
};
export default {
  validationErrors
};
