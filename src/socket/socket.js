import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/config';

let socket = null;

export const initSocket = () => {
    if (!socket) {
        // Ensure the URL is properly formatted for WebSocket
        let url;
        if (SOCKET_URL.startsWith('http')) {
            // Convert http:// or https:// to ws:// or wss://
            url = SOCKET_URL.replace(/^http/, 'ws');
        } else if (SOCKET_URL.startsWith('ws')) {
            // Already a WebSocket URL
            url = SOCKET_URL;
        } else {
            // Default to secure WebSocket
            url = `wss://${SOCKET_URL}`;
        }
        
        console.log('Connecting to WebSocket at:', url);
        
        socket = io(url, {
            withCredentials: true,
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
            secure: true,
            rejectUnauthorized: false,
            path: '/socket.io/'
        });

        socket.on('connect', () => {
            console.log('✅ Socket connected:', socket.id);
        });

        socket.on('disconnect', (reason) => {
            console.log('❌ Socket disconnected:', reason);
            if (reason === 'io server disconnect') {
                // Reconnect if the server disconnects us
                socket.connect();
            }
        });

        socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error.message);
        });

        socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    }
    return socket;
};

export const getSocket = () => {
    if (!socket) {
        return initSocket();
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};
