export interface Message {
    id: string;
    author: string;
    message: string;
    image: string | null;
}

export type MessageMutation = Omit<Message, 'id'>;