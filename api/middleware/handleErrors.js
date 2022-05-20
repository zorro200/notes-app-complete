const ERROR_HANDLERS = {
  CastError: res =>
    res.status(400).send({ error: 'id used is malformed' }),

  ValidationError: (res, { message }) =>
    res.status(409).send({ error: message }),

  JsonWebTokenError: res =>
    res.status(401).json({ error: 'token missing or invalid' }),

  TokenExpiredError: res =>
    res.status(401).json({ error: 'token expired' }),

  defaultError: (res, err) => {
    console.log(err.name)
    res.status(500).end()
  }
}

module.exports = (err, req, res, next) => {
  const handler =
    ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError

  handler(res, err)
}
