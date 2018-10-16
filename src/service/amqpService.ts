import amqplib, { Channel, Message } from 'amqplib';
import { AMQP_USER, AMQP_PASSWORD, AMQP_HOST } from '../utils/secrets';
import { injectable, inject } from 'inversify';
import { SocketService } from './socketService';
import Types from '../config/types';

export interface AMQPService {
    start(): Promise<any>;
}

@injectable()
export class AMQPServiceImp implements AMQPService {

    @inject(Types.SocketService)
    private socketService: SocketService;

    private channel: Channel;

    private async init() {
        const connectionString = `amqp://${AMQP_USER}:${AMQP_PASSWORD}@${AMQP_HOST}/${AMQP_USER}?heartbeat=60`;
        const rabbitConnection = await amqplib.connect(connectionString);
        return await rabbitConnection.createChannel();
    }

    public async start(): Promise<any> {
        try {
            this.channel = await this.init();
            this.channel.on('error', (err: any) => {
                console.log(`[AMQP] ${err.message}`);
                return setTimeout(this.start, 10000);
            });
            this.channel.on('close', () => {
                console.log(`[AMQP] reconnecting`);
                return setTimeout(this.start, 10000);
            });
            this.userRegistered();
        } catch (error) {
            console.log(`[AMQP] ${error}`);
            return setTimeout(this.start, 30000);
        }
    }

    private async userRegistered() {
        await this.channel.assertQueue('test', { durable: true });
        await this.channel.prefetch(10);
        this.channel.consume('test', (msg: Message) => {
            console.log(msg.content.toString());
            const data = JSON.parse(msg.content.toString());
            this.socketService.emit(data.event, data.message);
        }, { noAck: true });
        console.log('[AMQP] Listening to test');
    }

}