import {
  Message as ChatMessage,
  useCreateConversationQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from '@/api/chatApi';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useChat } from '@/hooks/useChat';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,

  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function LiveChatModal({ visible, onClose }: Props) {

  const tint = useThemeColor({}, 'tint');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Create or fetch conversation
  const { data: conversationData, isLoading: isConversationLoading } = useCreateConversationQuery();
  const conversationId = conversationData?.data?.id;

  // Fetch messages only when opening the chat modal
  const {
    data: messagesData,
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(conversationId!, {
    skip: !conversationId || !visible,
  });

  // Send message mutation
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Socket.io integration for real-time messages
  // Always use a stable callback for onNewMessage
  const handleNewMessage = useCallback((incomingMessage: ChatMessage) => {
    // Only add message if it belongs to the current conversation
    if (incomingMessage.conversationId === conversationId) {
      setMessages((prev) => {
        // Prevent duplicate messages by filtering out any with the same id
        const filtered = prev.filter((m) => m.id !== incomingMessage.id);
        return [...filtered, incomingMessage];
      });
      scrollToBottom();
    }
  }, [conversationId]);

  // Auto-scroll to bottom on new messages or when modal opens
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  }, []);

  // Socket.io integration for real-time messages
  const { isConnected, error, broadcastMessage } = useChat({
    conversationId,
    onNewMessage: handleNewMessage,
  });

  useEffect(() => {
    if (visible) {
      scrollToBottom();
    }
  }, [messages, visible]);

  // Load messages when modal opens and conversation is ready
  useEffect(() => {
    if (!visible || !conversationId || !messagesData) return;
    setLoading(true);
    setMessages(messagesData.data || []);
    setLoading(false);
    // Scroll to bottom when modal opens and messages are loaded
    setTimeout(() => {
      scrollToBottom();
    }, 150);
  }, [visible, conversationId, messagesData]);

  // Send message handler
  const handleSendMessage = async () => {
    if (inputText.trim() && conversationId) {
      try {
        const messageText = inputText;
        setInputText('');

        await sendMessage({
          conversationId,
          text: messageText
        }).unwrap();

        // Do NOT add message to local state here; rely on socket event
        // Optionally, you can scroll to bottom
        scrollToBottom();
      } catch (e) {
        // Restore message on error
        setInputText(inputText);
        console.error('Failed to send message:', e);
      }
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: tint }]}>
        <Text style={styles.headerTitle}>Chat With Agent</Text>
        {/* <View style={styles.headerStatus}>
            {isConnected ? (
              <View style={styles.statusConnected}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Connected</Text>
              </View>
            ) : (
              <View style={styles.statusDisconnected}>
                <View style={[styles.statusDot, { backgroundColor: '#FF6B6B' }]} />
                <Text style={[styles.statusText, { color: '#FF6B6B' }]}>Disconnected</Text>
              </View>
            )}
          </View> */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >

        {/* Messages */}

        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={[
            { flexGrow: 1, paddingTop: 15, paddingBottom: 80 }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
        <View style={styles.messagesContainer}>
          <View style={styles.messagesContent}>
              {isConversationLoading || loading ? (
            <Text>Loading chat...</Text>
          ) : (
            messages.map((message: ChatMessage) => (
              <View
                key={message.id}
                style={[
                  styles.messageBubble,
                  message.sender ? styles.userMessage : styles.agentMessage,
                ]}
              >
                <View
                  style={[
                    styles.avatarCircle,
                    {
                      backgroundColor: message.sender ? tint : '#E0E0E0',
                    },
                  ]}
                >
                  <Text style={styles.avatarText}>
                    {message.sender ? 'U' : 'A'}
                  </Text>
                </View>
                <View style={styles.messageContent}>
                  <Text
                    style={[
                      styles.messageText,
                      message.sender
                        ? styles.userMessageText
                        : styles.agentMessageText,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              </View>
            ))
          )}
            </View>

          </View>

     
        </ScrollView>


      </KeyboardAvoidingView>
           {/* Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Type Your Message Here..."
              placeholderTextColor="#999"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: tint, opacity: isSending ? 0.5 : 1 }]}
              onPress={handleSendMessage}
              disabled={isSending || !inputText.trim()}
            >
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: 16,
    position: 'relative',
  },
  screen: {
    paddingHorizontal: 20
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerStatus: {
    position: 'absolute',
    right: 60,
    top: 50,
  },
  statusConnected: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDisconnected: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6BCB77',
  },
  statusText: {
    fontSize: 12,
    color: '#6BCB77',
    fontWeight: '500',
  },
  closeButton: {
    position: 'absolute',
    // right: 16,
    // top: 50,
    right: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    // backgroundColor: '#F5F5F5',
  },
  messagesContent: {
    padding: 10,
    gap: 16,
  },
  messageBubble: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  userMessage: {
    flexDirection: 'row-reverse',
  },
  agentMessage: {
    flexDirection: 'row',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  messageContent: {
    flex: 1,
    maxWidth: '75%',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    padding: 12,
    borderRadius: 12,
  },
  userMessageText: {
    backgroundColor: '#E3F2FD',
    color: '#11181C',
  },
  agentMessageText: {
    backgroundColor: '#E0E0E0',
    color: '#11181C',
  },


  inputContainer: {
     position: 'absolute',
     left: 0,
     right: 0,
     bottom: 0,
     flexDirection: 'row',
     alignItems: 'flex-end',
     paddingHorizontal: 10,
     paddingVertical: 10,
     backgroundColor: '#fff',
     borderTopWidth: 1,
     borderTopColor: '#E0E0E0',
     gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 24,
    paddingHorizontal: 16,
    
    paddingVertical: 12,
    fontSize: 14,
    maxHeight: 100,
    color: '#11181C',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
