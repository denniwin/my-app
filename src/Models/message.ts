export interface Message {
    author: string;
    content: string;
    channel: string;
    id: string;
    date: string;
    attachments: any[];
    senderNumber: string;
    region: string;
  }