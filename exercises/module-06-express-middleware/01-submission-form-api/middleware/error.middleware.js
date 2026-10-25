// Middleware capturador de 404 (Not Found)
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

// Middleware final terminal de erro (assinatura obrigatória de 4 parâmetros)
export const finalErrorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  console.error(err);

  const message = status === 500
    ? "Internal Server Error (Check Server Logs)"
    : err.message;

  res.status(status).json({
    error: true,
    status,
    message
  });
};
