import winston from 'winston';
// import fs from 'fs';

const { createLogger, format /*transports*/ } = winston;

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: format.combine(
    format.timestamp(),
    format.colorize({ all: true }),
    format.prettyPrint()
  )
  // change below if we want to log to file, use stream
  // transports: [
  //   new winston.transports.Console({
  //     format: winston.format.prettyPrint()
  //   })
  // ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

export default logger;
