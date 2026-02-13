
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://streamflow-backend-production.up.railway.app';
console.log(`[Receiver] Connecting to ${SOCKET_URL}...`);

const socket = io(SOCKET_URL, { forceNew: true });
const user = {
  id: `test_receiver_${Date.now()}`,
  name: "Receiver Mary",
  age: 20,
  gender: "female",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary",
  intentStatus: "Waiting",
  isAuthenticated: false,
  country: "TestLand"
};

socket.on('connect', () => {
    console.log('[Receiver] Connected');
    socket.emit('user:register', user, (data) => {
        console.log(`[Receiver] Registered: ${data.userId}`); // Should print ID
        console.log('READY_FOR_KNOCK');
    });
});

socket.on('knock:received', (data) => {
    console.log('[Receiver] ✅ KNOCK RECEIVED:', data);
    process.exit(0);
});

// Keep alive
setTimeout(() => {
    console.log('[Receiver] Timeout (60s)');
    process.exit(1);
}, 60000);
