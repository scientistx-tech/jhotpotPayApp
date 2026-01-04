import { useThemeColor } from '@/hooks/use-theme-color';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';


import {
  Message as ChatMessage,
  useCreateConversationQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from '@/api/chatApi';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function LiveChatModal({ visible, onClose }: Props) {

  const tint = useThemeColor({}, 'tint');
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Create or fetch conversation
  const { data: conversationData, isLoading: isConversationLoading, refetch: refetchConversation } = useCreateConversationQuery();
  const conversationId = conversationData?.data?.id;

  // Fetch messages for conversation
  const {
    data: messagesData,
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useGetMessagesQuery(conversationId!, {
    skip: !conversationId || !visible,
    pollingInterval: visible && conversationId ? 3000 : 0,
  });

  // Send message mutation
  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  // Send message handler
  const handleSendMessage = async () => {
    if (inputText.trim() && conversationId) {
      try {
        await sendMessage({ conversationId, text: inputText }).unwrap();
        setInputText('');
        refetchMessages();
      } catch (e) {
        // Optionally handle error
      }
    }
  };

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messagesData]);

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: tint }]}>
          <Text style={styles.headerTitle}>Chat With Agent</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Messages */}

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {isConversationLoading || isMessagesLoading ? (
            <Text>Loading chat...</Text>
          ) : (
            messagesData?.data?.map((message: ChatMessage) => (
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
        </ScrollView>

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
      </KeyboardAvoidingView>
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
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    position: 'relative',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 50,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesContent: {
    padding: 16,
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
    backgroundColor: '#fff',
    color: '#11181C',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
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
