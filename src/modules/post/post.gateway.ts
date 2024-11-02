import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'posts', cors: true })
export class PostGateway{

    @SubscribeMessage('reaction')
    public async react(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
        client.emit('reaction', body);
        client.broadcast.emit('reaction', body);
    }


    @SubscribeMessage('postAdded')
    public async postAdded(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
        client.emit('postAddedData', body);
        client.broadcast.emit('postAddedData', body);
    }
}