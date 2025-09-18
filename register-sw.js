// register-sw.js

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/background-timer.js')
        .then(registration => {
            console.log('Service Worker مسجل بنجاح:', registration.scope);
        })
        .catch(error => {
            console.error('فشل تسجيل Service Worker:', error);
        });
} else {
    console.warn('المتصفح لا يدعم Service Workers');
}