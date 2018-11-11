const express = require('express');
const logger = require('./logger');
const digest = require('./routes/digest');
const google = require('./routes/google');
const pdf = require('./routes/pdf');

const PORT = process.env.PORT || 8899;

const server = express();
server.use('/v1/api/digest', digest);
server.use('/v1/api/google', google);
server.use('/v1/api/pdf', pdf);

server.use((err, req, res, next) => {
  logger.error(err);
  if (res.headersSent) {
    next(err);
    return;
  }
  if (err.status) {
    res.status(err.status);
    res.json({ error: err.message });
    return;
  }
  res.status(500);
  res.json({ error: 'Unknown error' });
});

server.listen(PORT, () => logger.info(`Server listening on port ${PORT}`));
