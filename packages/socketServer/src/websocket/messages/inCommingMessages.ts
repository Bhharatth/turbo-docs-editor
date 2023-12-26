import z, { ZodAny } from 'zod';
import { Quill } from "quill";

export enum SupportedMessage {
    JoinRoom = "JOIN_ROOM",
    SendMessages = "SEND_MESSAGE",
};

export type IncomeMessge = {
    type: SupportedMessage.JoinRoom,
    payload: InitMessageType
} | {
    type: SupportedMessage.SendMessages,
    payload: UserMessageType
}

export const InitMessage = z.object({
    name: z.string(),
    userId: z.string(),
    roomId: z.string(),
});

export type InitMessageType = z.infer<typeof InitMessage>

export const UserMessage = z.object({
    userId: z.string(),
    roomId: z.string(),
    message: z.any(),
});

export type UserMessageType = z.infer<typeof UserMessage>