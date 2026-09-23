// IoT Assist – Device catalog
// Replace or extend this list when connecting to the real backend (GET /api/devices)

export const DEVICE_CATEGORIES = [
  'Smart Home',
  'Security',
  'Entertainment',
  'Networking',
  'Climate Control',
];

export const devices = [
  {
    id: 'smart-bulb',
    name: 'Smart Bulb',
    category: 'Smart Home',
    icon: '💡',
    description: 'Wi-Fi or Zigbee enabled smart lighting',
    commonProblems: [
      'Won\'t connect to Wi-Fi',
      'Flickering or dimming unexpectedly',
      'App cannot detect bulb',
      'Color/brightness not saving',
    ],
  },
  {
    id: 'smart-camera',
    name: 'Smart Camera',
    category: 'Security',
    icon: '📷',
    description: 'IP security camera with remote access',
    commonProblems: [
      'Camera offline',
      'Wi-Fi connection dropping',
      'Video feed not loading',
      'Motion detection not working',
    ],
  },
  {
    id: 'smart-plug',
    name: 'Smart Plug',
    category: 'Smart Home',
    icon: '🔌',
    description: 'Remote-controlled power outlet',
    commonProblems: [
      'Not responding to commands',
      'Cannot connect to network',
      'Scheduling not working',
      'Power monitoring inaccurate',
    ],
  },
  {
    id: 'smart-speaker',
    name: 'Smart Speaker',
    category: 'Entertainment',
    icon: '🔊',
    description: 'Voice-controlled smart audio device',
    commonProblems: [
      'Bluetooth connection issues',
      'Voice assistant not responding',
      'Music playback stops randomly',
      'Wi-Fi drops frequently',
    ],
  },
  {
    id: 'smart-thermostat',
    name: 'Smart Thermostat',
    category: 'Climate Control',
    icon: '🌡️',
    description: 'Intelligent HVAC control system',
    commonProblems: [
      'Schedule not activating',
      'Temperature reading incorrect',
      'Remote control not working',
      'HVAC not responding',
    ],
  },
  {
    id: 'smart-door-lock',
    name: 'Smart Door Lock',
    category: 'Security',
    icon: '🔒',
    description: 'Keyless entry with remote access',
    commonProblems: [
      'Lock not responding to app',
      'Keypad not working',
      'Low battery notifications',
      'Auto-lock not engaging',
    ],
  },
  {
    id: 'wifi-router',
    name: 'Wi-Fi Router',
    category: 'Networking',
    icon: '📡',
    description: 'Wireless network access point',
    commonProblems: [
      'Internet connection drops',
      'Slow Wi-Fi speeds',
      'Devices not connecting',
      'Firmware update issues',
    ],
  },
  {
    id: 'smart-tv',
    name: 'Smart TV',
    category: 'Entertainment',
    icon: '📺',
    description: 'Internet-connected television',
    commonProblems: [
      'Streaming apps crashing',
      'Wi-Fi disconnects',
      'Remote not working',
      'Screen mirroring fails',
    ],
  },
];

export const getDeviceById = (id) => devices.find((d) => d.id === id) || null;
