import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

/**
 * Get or create socket.io connection
 * Connects to the root namespace by default
 * The backend should have socket.io configured with proper CORS settings
 */
export function getSocket(): Socket {
  if (!socket) {
    // Use the backend-provided socket URL directly
    const SOCKET_URL = 'https://api.jhotpotpay.com';
    socket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });

    if (__DEV__) {
      console.log('[Socket.io] Connecting to:', SOCKET_URL);
    }
  }
  return socket as Socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
