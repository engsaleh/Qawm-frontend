const API_URL = 'https://qawm-api.onrender.com';
const API_KEY = 'your_super_secret_api_key_1'; // تأكد من استبدال هذا بمفتاح API حقيقي وآمن في بيئة الإنتاج

async function fetchQawms() {
    try {
        const res = await fetch(`${API_URL}/qawms`, {
            headers: { 'X-API-Key': API_KEY }
        });
        if (!res.ok) {
            // رمي خطأ بمعلومات أكثر تفصيلاً إذا كان الاستجابة ليست OK
            const errorData = await res.json().catch(() => ({ message: 'غير قادر على تحليل الخطأ' }));
            throw new Error(`خطأ في جلب البيانات: ${res.status} - ${errorData.message || res.statusText}`);
        }
        const data = await res.json();
        return data.qawms || [];
    } catch (e) {
        // تحسين رسالة الخطأ لتكون أوضح
        throw new Error(`فشل الاتصال بالواجهة البرمجية. يرجى التحقق من اتصالك بالإنترنت والمفتاح: ${e.message}`);
    }
}
