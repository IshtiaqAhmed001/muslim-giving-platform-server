// Catches any request to an unrecognised /api/* route. Mounted after all
// real routes in app.js, so it only fires when nothing else matched.
export function notFound(req, res) {
  res.status(404).json({ error: `Not found: ${req.method} ${req.originalUrl}` });
}
