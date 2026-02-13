
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://streamflow-backend-production.up.railway.app';
console.log(`[Receiver] Connecting to ${SOCKET_URL}...`);

const socket = io(SOCKET_URL, { forceNew: true });
const user = {
  id: `flow_receiver_${Date.now()}`,
  name: "Flow Receiver",
  age: 22,
  gender: "female",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FlowRec",
  intentStatus: "Waiting",
  isAuthenticated: false,
  country: "TestLand"
};

socket.on('connect', () => {
    console.log('[Receiver] Connected');
    socket.emit('user:register', user, (data) => {
        console.log(`[Receiver] Registered: ${data.userId}`);
        console.log('READY_FOR_KNOCK');
    });
});

socket.on('knock:received', (data) => {
    console.log('[Receiver] 🚪 KNOCK RECEIVED:', data);
    console.log('[Receiver] Accepting knock...');
    socket.emit('knock:accept', { 
        knockId: data.knockId, 
        fromUserId: data.fromUserId 
    });
});

socket.on('session:created', (data) => {
    console.log('[Receiver] ⏳ Session Created (Wait Mode):', data.waitingForPartner);
    if (!data.waitingForPartner) {
        console.error('[Receiver] ❌ ERROR: Expected waitingForPartner: true');
    }
});

socket.on('session:partner_joined', (data) => {
    console.log('[Receiver] ✅ PARTNER JOINED! Flow Complete.', data);
    process.exit(0);
});

setInterval(() => {}, 1000); // Keep alive
