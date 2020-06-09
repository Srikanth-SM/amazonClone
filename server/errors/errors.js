const validationErrors = function(err, req, res, next) {
  console.log('Inside validation errors', JSON.stringify(err));

  res
    .status(err.httpStatusCode || err.code || 500)
    .send({ error: err.message || err, stack: err.stack });
};
export default {
  validationErrors,
};
