import { baseApi } from "./baseApi";

export interface ConversationResponse {
  success: boolean;
  data: {
    id: string;
    senderId: string;
    createdAt: string;
  };
}

export interface Message {
  id: string;
  text: string;
  read: boolean;
  sender: boolean;
  conversationId: string;
  createdAt: string;
}

export interface MessagesResponse {
  success: boolean;
  data: Message[];
}

export interface SendMessageRequest {
  text: string;
}

export interface SendMessageResponse {
  success: boolean;
  data: Message;
}

export const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createConversation: builder.query<ConversationResponse, void>({
      query: () => ({ url: "/chat/conversation", method: "GET" }),
    }),
    getMessages: builder.query<MessagesResponse, string>({
      query: (conversationId) => ({ url: `/chat/messages/${conversationId}`, method: "GET" }),
    }),
    sendMessage: builder.mutation<SendMessageResponse, { conversationId: string; text: string }>({
      query: ({ conversationId, text }) => ({
        url: `/chat/messages/${conversationId}`,
        method: "POST",
        body: { text },
      }),
    }),
  }),
});

export const {
  useCreateConversationQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} = chatApi;
