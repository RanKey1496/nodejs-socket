import dotenv from 'dotenv';
import fs from 'fs';

function getEnvironment(path: string, env: string) {
    if (fs.existsSync(path)) {
        console.log(`Using ${env} environment variables`);
        dotenv.config({ path });
    } else {
        console.error(`Can't load ${env} ${path} variables`);
        process.exit(1);
    }
}

export const ENVIRONMENT = process.env.NODE_ENV;

if (ENVIRONMENT === 'production') {
    getEnvironment('.env', ENVIRONMENT);
} else {
    if (ENVIRONMENT === 'test') {
        getEnvironment('.env.test', ENVIRONMENT);
    } else {
        getEnvironment('.env.dev', 'development');
    }
}

export const PORT = process.env.PORT;

/**
 * Winston logger
 */
export const LOGGING_ERROR_PATH = process.env.LOGGING_ERROR_PATH;
export const LOGGING_EXCEPTION_PATH = process.env.LOGGING_EXCEPTION_PATH;
export const LOGGING_LEVEL_CONSOLE = process.env.LOGGING_LEVEL_CONSOLE;
export const LOGGING_LEVEL_FILE = process.env.LOGGING_LEVEL_FILE;

/**
 * RabbitMQ URL
 */
export const AMQP_HOST = process.env.AMQP_HOST;
export const AMQP_USER = process.env.AMQP_USER;
export const AMQP_PASSWORD = process.env.AMQP_PASSWORD;