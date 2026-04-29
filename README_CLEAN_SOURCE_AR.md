# DiwanSuite - نسخة سورس نظيفة

هذه نسخة سورس كود منظفة للاستيراد في v0 أو GitHub أو بيئة تطوير محلية.

## ما تحتويه النسخة
- كود React + Vite + TypeScript.
- ملفات API وPHP الموجودة بالمشروع.
- صور الواجهة داخل `public/assets/images`.
- `favicon.ico` داخل `public/favicon.ico`.
- ملفات التحقق والسكريبتات التقنية المطلوبة للبناء والفحص.

## ما تمت إزالته للتنظيف
- تقارير التسليم المرحلية القديمة.
- ملفات JSON الخاصة بالتحقق المرحلي.
- صور فحص قديمة مثل audit/final/verify screenshots.
- مجلدات البناء والحزم مثل `dist` و`node_modules` إن وجدت.
- ملفات Hash وسجلات غير لازمة للاستيراد.

## التشغيل المحلي

```bash
npm install
npm run dev
```

## إنشاء نسخة Build

```bash
npm run build
npm run check:links
npm run check:seo-aeo
npm run check:text
```

## ملاحظات مهمة
- لا توجد نسخة `dist` داخل هذه الحزمة لأنها مخصصة كسورس نظيف.
- لا توجد `node_modules` لتقليل الحجم وجعل الاستيراد أنظف.
- هذه آخر نسخة مصدرية بعد مراحل SEO/AEO وتحديث الأصول البصرية.
