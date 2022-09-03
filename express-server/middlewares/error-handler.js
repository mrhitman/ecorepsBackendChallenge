module.exports = function (err, req, res, next) {
  global.console.warn(`error handler: `, err);

  if (err instanceof SyntaxError) {
    res.status(400);
    return res.send(err);
  }

  if (err.name === 'ValidationError') {
    res.status(400);
    return res.send({
      message: err.message
    });
  }

  // Dublicate error on insert
  if (err.name === 'MongoServerError' && err.code === 11000) {
    res.status(400);

    return res.send({
      message: err.message,
    });
  }

  if (err.name === 'CastError') {
    res.status(400);

    return res.send({
      message: err.message,
    });
  }

  global.console.warn(err.message);
  res.status(500);
  res.send('Something went wrong');
};
