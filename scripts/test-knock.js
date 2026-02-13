
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://streamflow-backend-production.up.railway.app';
// const SOCKET_URL = 'http://localhost:3002'; // Use local for dev check if needed

console.log(`Testing Knock on ${SOCKET_URL}...`);

// User 1: Receiver (Guest)
const receiver = io(SOCKET_URL, { forceNew: true });
const receiverUser = {
  id: `test_receiver_${Date.now()}`,
  name: "Receiver Mary",
  age: 20,
  gender: "female",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary",
  intentStatus: "Waiting",
  isAuthenticated: false,
  country: "TestLand"
};

// User 2: Sender (Auth)
const sender = io(SOCKET_URL, { forceNew: true });
const senderUser = {
  id: `test_sender_${Date.now()}`,
  name: "Sender John",
  age: 25,
  gender: "male",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  intentStatus: "Knocking",
  isAuthenticated: true,
  country: "TestLand"
};

async function runTest() {
    console.log('--- STARTING SEQUENCE ---');

    // 1. Connect Receiver
    console.log('1. Connecting Receiver...');
    await new Promise(resolve => {
        receiver.on('connect', () => {
             console.log('✅ Receiver Connected');
             resolve();
        });
    });

    console.log('2. Registering Receiver...');
    await new Promise(resolve => {
         receiver.emit('user:register', receiverUser, (data) => {
             console.log('✅ Receiver Registered:', data.userId);
             resolve();
         });
    });

    // 2. Connect Sender
    console.log('3. Connecting Sender...');
    await new Promise(resolve => {
        sender.on('connect', () => {
             console.log('✅ Sender Connected');
             resolve();
        });
        sender.on('connect_error', (err) => {
             console.log('❌ Sender Connection Error:', err.message);
        });
    });

    console.log('4. Registering Sender...');
    await new Promise(resolve => {
         sender.emit('user:register', senderUser, (data) => {
             console.log('✅ Sender Registered:', data.userId);
             resolve();
         });
    });

    // 3. Sender Knocks Receiver
    console.log(`🔨 Sender knocking on Receiver (${receiverUser.id})...`);
    
    // Setup listener on Sender for errors
    sender.on('knock:error', (err) => {
        console.error('❌❌❌ Sender received KNOCK ERROR:', err);
    });

    // Setup listener on Receiver BEFORE sending
    const knockReceivedPromise = new Promise(resolve => {
        receiver.on('knock:received', (data) => {
            console.log('✅✅✅ SUCCESS: Receiver got KNOCK!', data);
            resolve(true);
        });
    });

    sender.emit('knock:send', { 
        targetUserId: receiverUser.id,
        name: senderUser.name // Add name just in case server needs it
    });

    // Wait for result
    const result = await Promise.race([
        knockReceivedPromise,
        new Promise(resolve => setTimeout(() => {
            console.log('❌ TIMEOUT: Receiver did not get knock in 10s');
            resolve(false);
        }, 10000))
    ]);

    if (result) {
        process.exit(0);
    } else {
        process.exit(1);
    }
}

// Run safely
runTest().catch(err => {
    console.error("FATAL ERROR:", err);
    process.exit(1);
});
