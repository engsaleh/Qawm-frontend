async function showQawms() {
    const contentArea = document.getElementById('contentArea');

    // عرض حالة التحميل قبل بدء جلب البيانات
    contentArea.innerHTML = `
        <div class="loading-state">
            <div class="spinner"></div>
            <p>جارٍ تحميل البيانات...</p>
        </div>
    `;

    try {
        const qawmsData = await fetchQawms();

        if (!qawmsData || qawmsData.length === 0) {
            contentArea.innerHTML = '<p class="error-message">لا توجد بيانات للعرض حالياً.</p>';
            return;
        }

        let html = '<div class="qawm-grid">';
        qawmsData.forEach(q => {
            // استخدام أيقونة كتاب بسيطة للمراجع
            const referencesHtml = q.references && q.references.length > 0
                ? `<div class="references"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.794 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.794 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.206 18 16.5 18s-3.332.477-4.5 1.253"></path></svg> المراجع: ${q.references.join(', ')}</div>`
                : `<div class="references"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.206 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.794 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.794 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.206 18 16.5 18s-3.332.477-4.5 1.253"></path></svg> لا توجد مراجع محددة</div>`;

            html += `<div class="qawm-card">
                <h3>${q.name}</h3>
                <p class="description">${q.description.substring(0, 300)}${q.description.length > 300 ? '...' : ''}</p>
                ${referencesHtml}
            </div>`;
        });
        html += '</div>';
        contentArea.innerHTML = html;

    } catch (e) {
        // عرض رسالة خطأ واضحة للمستخدم
        contentArea.innerHTML = `<p class="error-message">عذرًا، حدث خطأ أثناء تحميل البيانات: ${e.message}</p>`;
        console.error("Failed to fetch Qawms:", e);
    }
}

// تشغيل الدالة عند اكتمال تحميل DOM
document.addEventListener('DOMContentLoaded', showQawms);
