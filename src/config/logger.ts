import * as winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import path from 'path';


const logDir = 'src/config/logs';


const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);


const format = winston.format.combine(

  winston.format.timestamp({ format: ' YYYY-MM-DD HH:MM:SS ||' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
      (info) => `${info.timestamp}   [  ${info.level}  ]  ▶  ${info.message}  `,
  )

);


const LOGGER = winston.createLogger({

  format,
  transports: [

      new winstonDaily ({

          level: 'info',
          datePattern: 'YYYY-MM-DD',
          filename: path.join(logDir, `%DATE%.log`),
          zippedArchive: true,	
          handleExceptions: true,
          maxFiles: 30

      }),
      new winstonDaily ({

          level: 'error',
          datePattern: 'YYYY-MM-DD',
          filename: path.join(logDir+ '/error', `%DATE%.error.log`),
          zippedArchive: true,
          maxFiles: 30

      }),
      new winston.transports.Console({

          handleExceptions: true

      })

  ],
  exceptionHandlers: [

      new winstonDaily ({

        level: 'error',
        datePattern: 'YYYY-MM-DD',
        filename: path.join(logDir+ '/error', `%DATE%.exception.log`),
        zippedArchive: true,	
        maxFiles: 30

    }),
  ]
});

export default LOGGER;








