// themeSwitcher.js - مبدل الثيمات

class ThemeSwitcher {
    constructor() {
        this.currentTheme = localStorage.getItem('selectedTheme') || 'light';
        this.applyTheme(this.currentTheme);
    }

    applyTheme(themeName) {
        // حذف أي ثيم قديم
        document.documentElement.removeAttribute('data-theme');
        
        // إذا كان الثيم ليس "فاتح" (الافتراضي)، ضع اسم الثيم
        if (themeName !== 'light') {
            document.documentElement.setAttribute('data-theme', themeName);
        }

        // حفظ الاختيار
        this.currentTheme = themeName;
        localStorage.setItem('selectedTheme', themeName);

        console.log(`تم تطبيق الثيم: ${themeName}`);
    }

    // دالة مساعدة للتبديل السريع
    switchTo(themeName) {
        this.applyTheme(themeName);
    }
}

// إنشاء نسخة عالمية
window.ThemeSwitcher = new ThemeSwitcher();