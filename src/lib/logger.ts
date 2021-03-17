import * as winston from 'winston';

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            // TODO move to config
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});
