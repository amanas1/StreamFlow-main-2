import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:3001";
const NUM_CLIENTS = 200;
const MSG_PER_CLIENT = 20;

let connectedCount = 0;
let registeredCount = 0;
let messagesSentAcked = 0;
let messagesReceived = 0;

const clients = [];

console.log(`🚀 Starting load test: ${NUM_CLIENTS} clients, communicating to ${SERVER_URL}`);
console.log(`⏱️ Please ensure your local backend is running (npm run server)`);

const statsInterval = setInterval(async () => {
    try {
        const res = await fetch(`${SERVER_URL}/stats`);
        const data = await res.json();
        const mem = data.memoryUsage;
        
        console.log(`\n--- LIVE SERVER MEMORY (200 Sockets) ---`);
        console.log(`Peak RSS: ${Math.round(mem.rss / 1024 / 1024)} MB`);
        console.log(`Peak Heap Used: ${Math.round(mem.heapUsed / 1024 / 1024)} MB`);
        console.log(`Active Users: ${data.activeUsers}`);
        console.log(`Active Sessions: ${data.activeSessions}`);
        console.log(`----------------------------------------\n`);
    } catch(err) {
        console.error(`Failed to fetch server stats: ${err.message}`);
    }
}, 3000);

for (let i = 0; i < NUM_CLIENTS; i++) {
    const socket = io(SERVER_URL, {
        reconnectionDelayMax: 5000,
        transports: ["websocket"] // Force websocket for pure concurrency test
    });

    const profile = {
        id: `loadbot_${i}`,
        name: `Bot ${i}`,
        age: 25,
        gender: i % 2 === 0 ? 'male' : 'female',
        avatar: '/default.png',
        country: 'LoadTestLand'
    };

    clients.push({ socket, profile });

    socket.on("connect", () => {
        connectedCount++;
        socket.emit("user:register", profile, (res) => {
            registeredCount++;
            if (registeredCount === NUM_CLIENTS) {
                console.log(`✅ All ${NUM_CLIENTS} clients connected & registered. Beginning pairing...`);
                startLoadPhase();
            }
        });
    });

    socket.on("message:received", (msg) => {
        messagesReceived++;
        if (messagesReceived % 500 === 0) {
            console.log(`📥 Received ${messagesReceived} total messages across all bots...`);
        }
    });

    socket.on("connect_error", (err) => {
        console.error(`Bot ${i} connection error:`, err.message);
    });
}

function startLoadPhase() {
    console.log("🔥 Initiating Knocks, Session Joins, and Message Spams...");

    // Pair up bots: Bot 0 knocks Bot 1, Bot 2 knocks Bot 3...
    for (let i = 0; i < NUM_CLIENTS; i += 2) {
        if (!clients[i + 1]) break;
        
        const botA = clients[i];
        const botB = clients[i + 1];

        // 1. Bot B listens for knock and immediately accepts
        botB.socket.on("knock:received", (data) => {
            botB.socket.emit("knock:accept", { knockId: data.knockId, fromUserId: botA.profile.id });
        });

        // 2. Bot A listens for accepted knock, joins session, and starts blasting
        botA.socket.on("knock:accepted", (data) => {
            botA.socket.emit("session:join", { sessionId: data.sessionId });
            
            // Blast 20 messages instantly from A -> B
            for (let m = 0; m < MSG_PER_CLIENT; m++) {
                botA.socket.emit("message:send", {
                    sessionId: data.sessionId,
                    encryptedPayload: `encrypted_text_simulation_${m}`,
                    messageType: "text",
                    metadata: {}
                }, (ack) => {
                    if (ack && ack.success) {
                        messagesSentAcked++;
                        checkCompletion();
                    } else {
                        console.error(`Bot A failed to send message: ${ack?.error}`);
                    }
                });
            }
            
            // Blast 20 messages instantly from B -> A
            for (let m = 0; m < MSG_PER_CLIENT; m++) {
                botB.socket.emit("message:send", {
                    sessionId: data.sessionId,
                    encryptedPayload: `encrypted_text_simulation_B_${m}`,
                    messageType: "text",
                    metadata: {}
                }, (ack) => {
                    if (ack && ack.success) {
                        messagesSentAcked++;
                        checkCompletion();
                    }
                });
            }
        });

        // Start chain
        botA.socket.emit("knock:send", { targetUserId: botB.profile.id });
    }
}

const TOTAL_EXPECTED_ACK = NUM_CLIENTS * MSG_PER_CLIENT;

function checkCompletion() {
    if (messagesSentAcked >= TOTAL_EXPECTED_ACK) {
        console.log(`\n🎉 LOAD TEST COMPLETE 🎉`);
        console.log(`Totally Expected: ${TOTAL_EXPECTED_ACK}`);
        console.log(`Total Acknowledged: ${messagesSentAcked}`);
        console.log(`Total Received: ${messagesReceived}`);
        
        console.log("\nDisconnecting all clients...");
        clearInterval(statsInterval);
        clients.forEach(c => c.socket.disconnect());
        
        console.log("Run 'npm run server' terminal to verify server CPU & Memory were stable.");
        process.exit(0);
    }
}

// Global hook to catch script crash
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
