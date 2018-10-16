import 'reflect-metadata';
import Types from './config/types';
import { container } from './config/inversify';
import { AMQPService } from './service/amqpService';

export default class App {

    public async start() {
        const amqpService = container.get<AMQPService>(Types.AMQPService);
        return await amqpService.start();
    }

}