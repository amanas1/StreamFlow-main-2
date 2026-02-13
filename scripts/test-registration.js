
import { io } from 'socket.io-client';

const SOCKET_URL = 'https://streamflow-backend-production.up.railway.app';

console.log(`Connecting to ${SOCKET_URL}...`);

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  reconnection: false
});

const testUser = {
  id: `test_hero_${Date.now()}`,
  name: "Captain Test 2",
  age: 30,
  gender: "male",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CaptainTest2",
  intentStatus: "Testing Visibility",
  voiceIntro: null,
  isAuthenticated: true, // Try with true to see if it changes visibility
  hasAgreedToRules: true,
  registrationTimestamp: Date.now(),
  country: "TestLand",
  chatSettings: {
    notificationsEnabled: true
  }
};

socket.on('connect', () => {
  console.log('✅ Connected to server');
  
  console.log('Registering user:', testUser.name);
  socket.emit('user:register', testUser);
});

socket.on('user:registered', (data) => {
  console.log('✅ Registration SUCCESS!');
  console.log('User ID:', data.userId);
  console.log('Waiting for presence update...');
});

socket.on('presence:list', (users) => {
  console.log(`Received presence list with ${users.length} users.`);
  
  
  const found = users.find(u => u.id === testUser.id);
  // Log first user to inspect structure
  if (users.length > 0) {
      console.log('First user sample:', JSON.stringify(users[0], null, 2));
  }
  
  if (found) {
    console.log('✅ SUCCESS: Test user IS visible in presence list!');
    console.log('Status:', found.status);
    // Keep running so user can check
  } else {
    console.log('❌ FAILURE: Test user NOT found in presence list yet.');
  }
});

socket.on('connect_error', (err) => {
  console.error('❌ Connection Error:', err.message);
  process.exit(1);
});

// Keep alive for 60s
setTimeout(() => {
  console.log('⏰ Test finished.');
  process.exit(0);
}, 60000);
