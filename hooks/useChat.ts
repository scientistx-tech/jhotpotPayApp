import { Message as ChatMessage } from '@/api/chatApi';
import { getSocket } from '@/lib/socket';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';

export interface UseChatsOptions {
  conversationId?: string;
  onNewMessage?: (message: ChatMessage) => void;
  onMessagesUpdate?: (messages: ChatMessage[]) => void;
}

/**
 * Custom hook for managing real-time chat using Socket.io
 * Handles socket connection, event listeners, and message broadcasts
 * Only establishes listeners when conversation is active
 */
export function useChat(options: UseChatsOptions = {}) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize socket connection
  useEffect(() => {
    try {
      socketRef.current = getSocket();

      // Connection event handlers
      socketRef.current.on('connect', () => {
        if (__DEV__) {
          console.log('[Chat] Socket connected:', socketRef.current?.id);
        }
        setIsConnected(true);
        setError(null);
      });

      socketRef.current.on('disconnect', () => {
        if (__DEV__) {
          console.log('[Chat] Socket disconnected');
        }
        setIsConnected(false);
      });

      socketRef.current.on('connect_error', (err: any) => {
        console.error('[Chat] Connection error:', err);
        setError(err?.message || 'Failed to connect to chat server');
      });

      return () => {
        // Cleanup on unmount
        if (socketRef.current) {
          socketRef.current.off('connect');
          socketRef.current.off('disconnect');
          socketRef.current.off('connect_error');
          socketRef.current.off('message:new');
        }
      };
    } catch (err) {
      console.error('[Chat] Socket initialization error:', err);
      setError('Failed to initialize chat connection');
    }
  }, []);

  // Listen for incoming messages only when conversation is active
  useEffect(() => {
    if (!socketRef.current || !options.conversationId) return;

    const handleNewMessage = (message: ChatMessage) => {
      if (__DEV__) {
        console.log('[Chat] New message received:', message.id);
      }
      options.onNewMessage?.(message);
    };

    const handleMessagesUpdate = (data: { messages: ChatMessage[] }) => {
      if (__DEV__) {
        console.log('[Chat] Messages updated:', data.messages.length);
      }
      options.onMessagesUpdate?.(data.messages);
    };

    socketRef.current.on('message', handleNewMessage);
    socketRef.current.on('messages:update', handleMessagesUpdate);

    return () => {
      if (socketRef.current) {
        socketRef.current.off('message', handleNewMessage);
        socketRef.current.off('messages:update', handleMessagesUpdate);
      }
    };
  }, [options.conversationId, options.onNewMessage, options.onMessagesUpdate]);

  /**
   * Emit a message to a specific conversation (real-time broadcast)
   */
  const broadcastMessage = useCallback((conversationId: string, message: ChatMessage) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('message:send', {
        conversationId,
        message,
      });
    }
  }, []);

  /**
   * Emit a typing indicator
   */
  const broadcastTyping = useCallback((conversationId: string, isTyping: boolean) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('user:typing', {
        conversationId,
        isTyping,
      });
    }
  }, []);

  return {
    isConnected,
    error,
    broadcastMessage,
    broadcastTyping,
  };
}
