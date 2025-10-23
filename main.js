async function showQawms() {
    const content = document.getElementById('contentArea');
    content.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>جارٍ تحميل البيانات...</p>
        </div>
    `;

    try {
        const qawmsData = await fetchQawms();
        if (qawmsData.length === 0) {
            content.innerHTML = '<p>لا توجد بيانات للعرض</p>';
            return;
        }

        let html = '<div class="qawm-grid">';
        qawmsData.forEach(q => {
            html += `<div class="qawm-card">
                <h3>${q.name}</h3>
                <div class="type">${q.type}</div>
                <div class="description">${q.description.substring(0, 180)}...</div>
                <div class="references">📚 المراجع: ${q.references.join(', ')}</div>
            </div>`;
        });
        html += '</div>';
        content.innerHTML = html;

    } catch (e) {
        content.innerHTML = `<p>حدث خطأ: ${e.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', showQawms);
