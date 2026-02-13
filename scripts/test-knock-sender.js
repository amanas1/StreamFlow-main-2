
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://streamflow-backend-production.up.railway.app';
const TARGET_ID = process.argv[2];

if (!TARGET_ID) {
    console.error('Usage: node test-knock-sender.js <TARGET_ID>');
    process.exit(1);
}

console.log(`[Sender] Connecting to ${SOCKET_URL}...`);
console.log(`[Sender] Target: ${TARGET_ID}`);

const socket = io(SOCKET_URL, { forceNew: true });
const user = {
  id: `test_sender_${Date.now()}`,
  name: "Sender John",
  age: 25,
  gender: "male",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  intentStatus: "Knocking",
  isAuthenticated: true,
  country: "TestLand"
};

socket.on('connect', () => {
    console.log('[Sender] Connected');
    socket.emit('user:register', user, (data) => {
        console.log(`[Sender] Registered: ${data.userId}`);
        
        console.log('[Sender] Sending Knock...');
        socket.emit('knock:send', { 
            targetUserId: TARGET_ID,
            name: user.name
        });
    });
});

socket.on('knock:sent', (data) => {
    console.log('[Sender] ✅ KNOCK SENT CONFIRMED:', data);
    // process.exit(0); // Wait a bit
    setTimeout(() => process.exit(0), 1000);
});

socket.on('knock:error', (err) => {
    console.error('[Sender] ❌ KNOCK ERROR:', err);
    process.exit(1);
});

setTimeout(() => {
    console.log('[Sender] Timeout');
    process.exit(1);
}, 20000);
