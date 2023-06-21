import axios from 'axios'
import { Message } from '../Models/message';
import { Response } from '../Models/posts';




export const GetPosts = async (messageId = 0, oldMessages = false): Promise<Message[]> => {
    
    const formData = new FormData();
    formData.append('actionName', 'MessagesLoad');
    formData.append('messageId', messageId.toString());

    const response = await axios.post<Response<Message>>("http://a0830433.xsph.ru/", formData);
    return response.data.Messages;
}