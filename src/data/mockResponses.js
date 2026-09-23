// IoT Assist – Mock AI Responses
// This file is the ONLY place that holds simulated AI output.
// When the real IBM Granite + RAG backend is ready, delete this file and
// wire chatbotService.js to the actual POST /api/chat endpoint.

export const SUGGESTED_PROBLEMS = {
  'smart-camera': [
    'Device won\'t connect to Wi-Fi',
    'Camera is offline',
    'Video feed is not loading',
    'Motion detection not working',
    'Image is blurry or black',
  ],
  'smart-bulb': [
    'Bulb won\'t connect to Wi-Fi',
    'Bulb is flickering',
    'App cannot find the bulb',
    'Bulb won\'t turn on',
    'Color not changing',
  ],
  'smart-plug': [
    'Plug not responding to commands',
    'Cannot connect to network',
    'Scheduling not working',
    'Power monitoring not accurate',
    'Plug keeps turning off',
  ],
  'smart-speaker': [
    'Bluetooth won\'t connect',
    'Voice assistant not responding',
    'Music stops randomly',
    'Wi-Fi drops frequently',
    'Speaker won\'t turn on',
  ],
  'smart-thermostat': [
    'Schedule not activating',
    'Temperature reading is wrong',
    'Remote control not working',
    'HVAC not responding',
    'App shows offline',
  ],
  'smart-door-lock': [
    'Lock not responding to app',
    'Keypad not working',
    'Low battery warning',
    'Auto-lock not engaging',
    'Cannot add new user codes',
  ],
  'wifi-router': [
    'Internet connection drops',
    'Slow Wi-Fi speeds',
    'Devices not connecting',
    'Firmware update failed',
    'Wi-Fi network not visible',
  ],
  'smart-tv': [
    'Streaming apps crashing',
    'Wi-Fi disconnects',
    'Remote control not working',
    'Screen mirroring fails',
    'TV won\'t turn on',
  ],
};

export const DEFAULT_SUGGESTIONS = [
  'Device won\'t connect to Wi-Fi',
  'Device is offline',
  'Device is not responding',
  'Connection keeps dropping',
  'Device won\'t turn on',
];

// ---------------------------------------------------------------------------
// Mock response templates
// ---------------------------------------------------------------------------

const wifiIssueResponse = (deviceName) => ({
  diagnosis: `Based on the information retrieved from the knowledge base, the most likely issue with your ${deviceName} is a **Wi-Fi connectivity or network configuration problem**. This is the most common cause for smart devices going offline or failing to connect.`,
  possibleIssue: 'Wi-Fi connectivity or network configuration problem',
  causes: [
    'Weak Wi-Fi signal or device too far from router',
    'Incorrect Wi-Fi password entered during setup',
    'Device connected to a 5 GHz network (some devices only support 2.4 GHz)',
    'Router firewall or MAC address filtering blocking the device',
    'ISP outage or router firmware issue',
  ],
  steps: [
    `Confirm the ${deviceName} is powered on and the indicator light is active.`,
    'Move the device closer to your Wi-Fi router to rule out signal strength.',
    'Restart your router: unplug for 30 seconds then plug back in.',
    'Verify you are using the correct Wi-Fi password (case-sensitive).',
    `Check your router settings — ensure 2.4 GHz network is enabled if your ${deviceName} doesn't support 5 GHz.`,
    `Restart the ${deviceName}: unplug for 10 seconds and reconnect.`,
    'Try re-adding the device in the companion app from scratch.',
  ],
  sources: [
    { title: `${deviceName} User Manual – Chapter 3: Network Setup`, relevance: 94, excerpt: 'Ensure the device is within 30 feet of the router during initial setup. 2.4 GHz networks provide better range for IoT devices.' },
    { title: 'IoT Wi-Fi Troubleshooting Guide v2.1', relevance: 89, excerpt: 'Most connectivity failures are resolved by restarting the router and re-entering network credentials in the device app.' },
    { title: 'Smart Device Connectivity FAQ', relevance: 82, excerpt: 'Q: Why won\'t my device connect? A: Verify the Wi-Fi band, password, and that your router supports WPA2 security.' },
  ],
  followUp: `Did these steps resolve the Wi-Fi connectivity issue with your ${deviceName}?`,
  safetyNote: null,
});

const offlineIssueResponse = (deviceName) => ({
  diagnosis: `The ${deviceName} appearing as offline in the app typically indicates a lost connection between the device and your home network or the cloud service.`,
  possibleIssue: 'Device offline — lost cloud or local network connection',
  causes: [
    'Power interruption causing the device to lose its connection state',
    'Router IP address change (DHCP lease renewal)',
    'Cloud service maintenance or outage',
    'Device firmware crash requiring a reboot',
    'App account session expired',
  ],
  steps: [
    `Check that the ${deviceName} is receiving power — look for indicator lights.`,
    'Force-close and reopen the companion app, then check device status.',
    'Log out of the app and log back in to refresh your session.',
    `Power-cycle the ${deviceName}: unplug, wait 15 seconds, plug back in.`,
    'Check the manufacturer\'s status page for any service outages.',
    'If still offline, remove the device from the app and re-add it.',
  ],
  sources: [
    { title: `${deviceName} Troubleshooting Guide – Offline Issues`, relevance: 91, excerpt: 'Devices show as offline when they cannot reach the cloud server. A power cycle resolves this in 85% of cases.' },
    { title: 'IoT Cloud Connectivity Reference', relevance: 85, excerpt: 'Cloud service interruptions are temporary. Check the service status dashboard before performing a factory reset.' },
    { title: 'Smart Home Network Best Practices', relevance: 78, excerpt: 'Assign static IP addresses to IoT devices to prevent them going offline after router DHCP renewals.' },
  ],
  followUp: `Is your ${deviceName} back online after trying these steps?`,
  safetyNote: null,
});

const powerIssueResponse = (deviceName) => ({
  diagnosis: `A ${deviceName} that won't turn on usually points to a power supply, hardware, or firmware issue.`,
  possibleIssue: 'Power or hardware failure',
  causes: [
    'Power adapter or cable is faulty',
    'Tripped circuit breaker or blown fuse',
    'Device firmware is corrupted',
    'Hardware failure requiring service',
  ],
  steps: [
    'Check the power cable and adapter — try a different outlet.',
    'Check your home circuit breaker for the room circuit.',
    'If there are no indicator lights at all, try a different power adapter of the same specification.',
    'Hold the reset button for 10+ seconds to attempt a firmware recovery boot.',
    'If none of the above work, contact manufacturer support for warranty replacement.',
  ],
  sources: [
    { title: `${deviceName} Hardware Guide – Power Requirements`, relevance: 88, excerpt: 'Use only the supplied power adapter. Incompatible adapters may prevent boot.' },
    { title: 'IoT Device Warranty & Support FAQ', relevance: 76, excerpt: 'Devices that show no indicator lights after power cycle may have a hardware fault covered under warranty.' },
  ],
  followUp: `Was the power issue resolved for your ${deviceName}?`,
  safetyNote: '⚠️ Do not attempt to open or repair the device yourself — this voids the warranty and may cause electric shock.',
});

const followUpResponses = [
  (deviceName) => ({
    diagnosis: `Let's dig deeper. I need to narrow down whether this is a router-side or device-side issue with your ${deviceName}.`,
    possibleIssue: 'Router or device configuration mismatch',
    causes: [
      'Router channel congestion (too many devices on same channel)',
      '2.4 GHz vs 5 GHz band mismatch',
      'WPS or network isolation features on router blocking the device',
    ],
    steps: [
      'Log into your router admin panel (usually 192.168.1.1 or 192.168.0.1).',
      'Navigate to Wireless Settings and check the Wi-Fi channel — change it to a less crowded channel (1, 6, or 11 for 2.4 GHz).',
      'Disable "AP Isolation" or "Client Isolation" if enabled.',
      'Ensure WPA2 or WPA3 security is selected (avoid WEP or open networks).',
      `Try connecting the ${deviceName} using your smartphone as a hotspot to see if the issue is router-specific.`,
    ],
    sources: [
      { title: 'Router Configuration Guide for IoT Devices', relevance: 92, excerpt: 'AP isolation prevents IoT devices from communicating with each other and with the internet. Disable this for smart home setups.' },
      { title: 'Wi-Fi Channel Optimization Guide', relevance: 84, excerpt: 'Channel congestion is common in apartment buildings. Use a Wi-Fi analyzer app to find the least congested channel.' },
    ],
    followUp: `Does the ${deviceName} connect successfully when using a mobile hotspot?`,
    safetyNote: null,
  }),
  (deviceName) => ({
    diagnosis: `Based on your continued issue, I recommend performing a factory reset on your ${deviceName} to clear any corrupted configuration.`,
    possibleIssue: 'Corrupted device configuration requiring factory reset',
    causes: [
      'Previous Wi-Fi credentials stored in device memory causing conflicts',
      'Firmware update interrupted leaving device in partial state',
      'Multiple failed connection attempts corrupting network settings',
    ],
    steps: [
      `Locate the reset button on your ${deviceName} (usually a small pinhole button).`,
      'Press and hold the reset button for 10–15 seconds until the indicator light flashes.',
      'Wait for the device to reboot (this takes 1–3 minutes).',
      'Open the companion app and add the device as new.',
      'When prompted for Wi-Fi, enter your network credentials carefully.',
      'Keep the device within 5 feet of the router during this process.',
    ],
    sources: [
      { title: `${deviceName} Factory Reset Instructions`, relevance: 96, excerpt: 'A factory reset clears all stored settings and returns the device to its out-of-box state. Ensure you have your Wi-Fi password before proceeding.' },
      { title: 'IoT Device Re-pairing Guide', relevance: 87, excerpt: 'After a reset, add the device to the app within 5 minutes while it is in pairing mode.' },
    ],
    followUp: `Did the factory reset and re-pairing resolve the issue with your ${deviceName}?`,
    safetyNote: '⚠️ A factory reset will erase all custom settings, automations, and schedules associated with this device.',
  }),
];

// ---------------------------------------------------------------------------
// Main mock response selector
// ---------------------------------------------------------------------------

export const getMockResponse = (deviceName, message, turnIndex = 0) => {
  const lower = message.toLowerCase();

  if (turnIndex > 0) {
    const fn = followUpResponses[(turnIndex - 1) % followUpResponses.length];
    return fn(deviceName);
  }

  if (lower.includes('offline') || lower.includes('not showing')) {
    return offlineIssueResponse(deviceName);
  }
  if (lower.includes('turn on') || lower.includes('power') || lower.includes('won\'t start')) {
    return powerIssueResponse(deviceName);
  }
  // Default: Wi-Fi connectivity (most common IoT problem)
  return wifiIssueResponse(deviceName);
};
