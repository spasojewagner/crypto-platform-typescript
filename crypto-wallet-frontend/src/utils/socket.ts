import { io } from 'socket.io-client';

// Povezivanje sa Socket.IO serverom (prilagodite URL prema vašem serveru)
const socket = io('http://localhost:5173', {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Event handleri
socket.on('connect', () => {
  console.log('Connected to crypto price stream');
});

socket.on('disconnect', () => {
  console.log('Disconnected from crypto price stream');
});

export default socket;