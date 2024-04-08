import 'winston-daily-rotate-file';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { LoggerService } from '@nestjs/common';

export const loggerOption: LoggerService = WinstonModule.createLogger({
  transports: [
    new transports.DailyRotateFile({
      filename: `logs/info/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false,
      maxFiles: '15d',
      format: format.combine(
        format.splat(),
        format.timestamp(),
        format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
      ),
    }),
    new transports.DailyRotateFile({
      filename: `logs/errors/%DATE%.log`,
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: false, // don't want to zip our logs
      maxFiles: '15d',
      format: format.combine(
        format.splat(),
        format.timestamp(),
        format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
      ),
    }),
    new transports.Console({
      format: format.combine(
        format.cli(),
        format.splat(),
        format.timestamp(),
        format.printf((info) => {
          return `${info.timestamp} ${info.level}: ${info.message}`;
        }),
      ),
    }),
  ],
});
