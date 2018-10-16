import socket, { Server, Socket } from 'socket.io';
import adapter from 'socket.io-redis';
import { createServer } from 'http';
import { injectable } from 'inversify';
import { PORT } from '../utils/secrets';

export interface SocketService {
    emit(event: string, message: string): void;
}

@injectable()
export class SocketServiceImp implements SocketService {

    private httpServer: any;
    private io: Server;

    constructor() {
        this.httpServer = createServer();
        this.io = socket(this.httpServer);
        this.io.adapter(adapter({
            host: 'redis-14087.c15.us-east-1-4.ec2.cloud.redislabs.com',
            port: 14087,
            auth_pass: '65OFql6jZl8fu5rJhOU8LjRDarp9rVEa'
        }));
        this.io.use(this.authorizathion);
        this.connections();
        this.httpServer.listen(PORT, async () => {
            console.log(`Service running at port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
            console.log('Date: ', new Date());
        });
    }

    private authorizathion(socket: Socket, next: any) {
        /*if (socket.handshake.query && socket.handshake.query.token) {
            console.log('[SIO] Socket handshake ', socket.handshake.query.token);
            next();
        } else {
            next(new Error('Authentication error'));
        }*/
        next();
    }

    public connections(): void {
        this.io.on('connection', (socket: Socket) => {
            console.log(`[SIO] Socket ${socket.id} connected listening to ${JSON.stringify(socket.rooms)}`);
            socket.on('disconnect', () => {
                console.log(`Socket ${socket.id} disconnected`);
            });
        });
    }

    public emit(event: string, message: string): void {
        this.io.emit(event, message);
    }

}