export interface Message {
    id: string;
    author: string;
    message: string;
    image: string | null;
}

export interface MessageMutation {
    author: string;
    message: string;
    image: File | null;
}