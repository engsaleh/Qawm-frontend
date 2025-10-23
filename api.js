const API_URL = 'https://qawm-api.onrender.com';
const API_KEY = 'your_super_secret_api_key_1';

async function fetchQawms() {
    try {
        const res = await fetch(`${API_URL}/qawms`, {
            headers: { 'X-API-Key': API_KEY }
        });
        if (!res.ok) throw new Error(`خطأ: ${res.status}`);
        const data = await res.json();
        return data.qawms || [];
    } catch (e) {
        throw new Error(`فشل الاتصال بالواجهة البرمجية: ${e.message}`);
    }
}
