// EXEMPLE : module de démonstration. À adapter ou à supprimer dans ton projet.
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const sendMessageSchema = z.object({
	room: z.string().min(1),
	content: z.string().min(1).max(2000),
});

export class SendMessageDto extends createZodDto(sendMessageSchema) {}
