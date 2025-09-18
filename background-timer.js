// background-timer.js

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    return self.clients.claim();
});

// تخزين حالة المؤقتات
const timers = new Map();

// استقبال الأوامر من الصفحة
self.addEventListener('message', (event) => {
    const { action, deviceId, startTime, isMultiplayer } = event.data;

    if (action === 'start') {
        // بدء مؤقت جديد
        timers.set(deviceId, {
            startTime: new Date(startTime),
            isMultiplayer,
            lastSync: Date.now()
        });
        console.log(`[Service Worker] بدء مؤقت للجهاز: ${deviceId}`);

    } else if (action === 'stop') {
        // إيقاف مؤقت
        timers.delete(deviceId);
        console.log(`[Service Worker] إيقاف مؤقت للجهاز: ${deviceId}`);

    } else if (action === 'sync') {
        // مزامنة الوقت مع الصفحة
        const timer = timers.get(deviceId);
        if (timer) {
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - timer.startTime.getTime()) / 1000);
            event.source.postMessage({
                type: 'timer-update',
                deviceId,
                seconds: elapsedSeconds
            });
        }
    }
});

// تنفيذ مزامنة دورية كل 30 ثانية (حتى في الخلفية)
setInterval(() => {
    timers.forEach((timer, deviceId) => {
        const now = Date.now();
        const elapsedSeconds = Math.floor((now - timer.startTime.getTime()) / 1000);
        
        // إرسال تحديث للصفحة لو مفتوحة
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'timer-update',
                    deviceId,
                    seconds: elapsedSeconds
                });
            });
        });
    });
}, 30000); // كل 30 ثانية