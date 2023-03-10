import * as winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import path from 'path';
import moment from 'moment-timezone';
import configVariable from '../src/global/config';


const logDir = (configVariable.env === 'development') ? 'config/logs' : 'dist/config';


const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);


const appendTimestamp = winston.format((info, opts) => {
  if (opts.tz)
    info.timestamp = moment().tz(opts.tz).format(" YYYY-MM-DD HH:mm:ss ||");
  return info;
});


const format = winston.format.combine(
  
  appendTimestamp({ tz: "Asia/Seoul" }),
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
          filename: path.join(logDir + '/log', `%DATE%.log`),
          zippedArchive: true,	
          handleExceptions: true,
          maxFiles: 30

      }),
      new winstonDaily ({

          level: 'error',
          datePattern: 'YYYY-MM-DD',
          filename: path.join(logDir + '/error', `%DATE%.error.log`),
          zippedArchive: true,
          maxFiles: 30

      }),
      new winstonDaily ({

          level: 'http',
          datePattern: 'YYYY-MM-DD',
          filename: path.join(logDir + '/http', `%DATE%.http.log`),
          zippedArchive: true,
          maxFiles: 30

      }),
      
      new winston.transports.Console({

          format: winston.format.colorize({ all: true }),
          handleExceptions: true

      })

  ],
  exceptionHandlers: [

      new winstonDaily ({

        level: 'error',
        datePattern: 'YYYY-MM-DD',
        filename: path.join(logDir + '/error', `%DATE%.exception.log`),
        zippedArchive: true,	
        maxFiles: 30

    }),
  ]
});

export default LOGGER;








