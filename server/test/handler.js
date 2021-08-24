

const handleError = (err, req, res, next) => {
  // set locals, only providing error in development (개발) 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // notify error
  res.status(err.status || 500).send('error');
};

module.exports = { handleError };