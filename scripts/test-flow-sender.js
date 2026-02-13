
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://streamflow-backend-production.up.railway.app';
const TARGET_ID = process.argv[2];

if (!TARGET_ID) {
    console.error('Usage: node test-flow-sender.js <TARGET_ID>');
    process.exit(1);
}

const socket = io(SOCKET_URL, { forceNew: true });
const user = {
  id: `flow_sender_${Date.now()}`,
  name: "Flow Sender",
  age: 27,
  gender: "male",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FlowSend",
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

socket.on('knock:accepted', (data) => {
    console.log('[Sender] 🎉 KNOCK ACCEPTED:', data);
    console.log('[Sender] Joining session...');
    socket.emit('session:join', { sessionId: data.sessionId });
});

socket.on('session:created', (data) => {
    console.log('[Sender] 🚀 Session Created (Join Confirm):', data);
    console.log('[Sender] waitingForPartner should be undefined/false:', data.waitingForPartner);
    setTimeout(() => process.exit(0), 1000);
});

setInterval(() => {}, 1000);
