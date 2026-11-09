// EXEMPLE : module de démonstration. À adapter ou à supprimer dans ton projet.
import { UsePipes } from '@nestjs/common';
import {
	ConnectedSocket,
	MessageBody,
	type OnGatewayConnection,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { ZodValidationPipe } from 'nestjs-zod';
import type { Server, Socket } from 'socket.io';
import type { SendMessageDto } from './dto/send-message.dto.js';

@WebSocketGateway({
	cors: { origin: process.env.CORS_ORIGIN, credentials: true },
})
export class ChatGateway implements OnGatewayConnection {
	@WebSocketServer()
	server!: Server;

	handleConnection(client: Socket) {
		// TODO: vérifier la session Better Auth ici
		client.emit('connected', { id: client.id });
	}

	@SubscribeMessage('room:join')
	joinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
		client.join(room);
		return { joined: room };
	}

	@UsePipes(ZodValidationPipe)
	@SubscribeMessage('message:send')
	sendMessage(@MessageBody() dto: SendMessageDto) {
		this.server.to(dto.room).emit('message:new', dto);
	}
}
