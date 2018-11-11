const chalk = require('chalk');

const getLogger = (level, colorizer, logger) => (...args) =>
  logger(colorizer(`[${level}]:`), ...args);

module.exports = {
  error: getLogger('error', chalk.red, console.error),
  warn: getLogger('warn', chalk.yellow, console.warn),
  info: getLogger('info', chalk.green, console.info),
  debug: getLogger('debug', chalk.blue, console.log),
  log: console.log,
};
