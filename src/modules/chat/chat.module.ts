// EXEMPLE : module de démonstration. À adapter ou à supprimer dans ton projet.
import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway.js';

@Module({ providers: [ChatGateway] })
export class ChatModule {}
