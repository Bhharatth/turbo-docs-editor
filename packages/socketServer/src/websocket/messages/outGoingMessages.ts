import { Quill } from "quill";

export enum SupportedMessage {
    AddChat = "Add_CHAT",
    UpdateChat = "UPDATE_CHAT",
}

type MessagePayload  = {
    roomId: string;
    message: Quill | string;
    name: string;
    chatId: string;
}
 
export type OutgoingMessage ={
    type: SupportedMessage.AddChat,
    payload: MessagePayload
} | {
    type: SupportedMessage.UpdateChat,
    payload: Partial<MessagePayload>
}