// Centralised error handler. Any route/middleware that calls next(err)
// ends up here instead of leaking Express's default HTML error page.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;

  console.error('[error]', err);

  res.status(status).json({
    error: err.message || 'Internal server error',
  });
}
