import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const URL = 'http://localhost:3001';
const NUM_CLIENTS = 100;
const DURATION_MS = 30000; // 30 seconds

const clients = [];
const metrics = {
    connected: 0,
    registered: 0,
    matchesStarted: 0,
    sessionsCreated: 0,
    messagesSent: 0,
    messagesReceived: 0,
    errors: 0,
    expiredMessages: 0,
    disconnects: 0,
};

let activeConnections = 0;

console.log(`Starting stress test with ${NUM_CLIENTS} clients for ${DURATION_MS / 1000} seconds...`);

const startTest = async () => {
    for (let i = 0; i < NUM_CLIENTS; i++) {
        setTimeout(() => createClient(i), i * 50); // Stagger connections
    }

    setTimeout(async () => {
        console.log('\\n--- STRESS TEST COMPLETE ---');
        console.log(metrics);
        
        // Disconnect all
        clients.forEach(c => c.disconnect());
        
        // Wait a bit to allow server to cleanup
        setTimeout(async () => {
            console.log('Sending final diagnostic request to server (if supported) or just exiting...');
            process.exit(0);
        }, 5000);
    }, DURATION_MS);
};

const createClient = (index) => {
    const socket = io(URL, { transports: ['websocket'], forceNew: true });
    clients.push(socket);
    
    const userId = `uuid_test_${uuidv4()}`;
    let mySessionId = null;

    socket.on('connect', () => {
        activeConnections++;
        metrics.connected++;
        
        // 1. Register
        socket.emit('user:register', { 
            id: userId, 
            nickname: `Bot_${index}`, 
            gender: index % 2 === 0 ? 'male' : 'female',
            age: 20 + (index % 10)
        });
    });

    socket.on('user:registered', () => {
        metrics.registered++;
        // 2. Start Matchmaking randomly
        setTimeout(() => {
            socket.emit('match:start');
            metrics.matchesStarted++;
        }, Math.random() * 2000);
    });

    socket.on('session:created', (data) => {
        metrics.sessionsCreated++;
        mySessionId = data.sessionId;
        
        // 3. Send a few messages
        const sendMsg = () => {
            if (!mySessionId || !socket.connected) return;
            socket.emit('message:send', {
                sessionId: mySessionId,
                text: `Test message from ${userId} at ${Date.now()}`,
                messageType: 'text'
            }, (ack) => {
                if (ack?.success) metrics.messagesSent++;
            });
        };

        // Send 3 messages staggered
        setTimeout(sendMsg, 500);
        setTimeout(sendMsg, 1500);
        setTimeout(sendMsg, 3000);
        
        // 4. Randomly disconnect some clients to test cleanup
        if (Math.random() < 0.2) {
            setTimeout(() => {
                socket.disconnect();
            }, 5000 + Math.random() * 5000);
        }
    });

    socket.on('message:received', (msg) => {
        metrics.messagesReceived++;
    });

    socket.on('message:expired', (data) => {
        metrics.expiredMessages++;
    });

    socket.on('user:error', (err) => {
        metrics.errors++;
    });

    socket.on('disconnect', () => {
        activeConnections--;
        metrics.disconnects++;
    });
};

startTest();
