import { Container } from 'inversify';
import Types from './types';
import { SocketService, SocketServiceImp } from '../service/socketService';
import { AMQPService, AMQPServiceImp } from '../service/amqpService';

const container: Container = new Container();

// Services
container.bind<AMQPService>(Types.AMQPService).to(AMQPServiceImp).inSingletonScope();
container.bind<SocketService>(Types.SocketService).to(SocketServiceImp).inSingletonScope();

export { container };