// --- 1. ОРТАҚ АЙНЫМАЛЫЛАР ---
let currentKey = 'math';

// --- 2. ПРОМТТАР БӨЛІМІНІҢ МӘЛІМЕТТЕРІ ---
const categories = {
    math: {
        title: "Есеп шығару промттары",
        desc: "Күрделі есептерді кезең-кезеңімен түсіндіруге арналған.",
        prompt: "Математикадан [Тақырып] бойынша есептің шығарылу жолын [Қосымша] оқушысына түсінікті тілмен түсіндіріп бер."
    },
    lesson: {
        title: "Сабақ жоспары промттары",
        desc: "Қысқа мерзімді жоспар (ҚМЖ) құрастыруға көмектеседі.",
        prompt: "Математикадан [Тақырып] тақырыбы бойынша 45 минуттық сабақ жоспарын құрастырып бер. [Қосымша] ескерілсін."
    },
    level: {
        title: "Деңгейлік тапсырмалар",
        desc: "A, B, C деңгейлеріне арналған дифференциалды тапсырмалар.",
        prompt: "[Тақырып] бойынша оқушыларға арналған 3 деңгейлі (жеңіл, орташа, күрделі) [Қосымша] тапсырма құрастыр."
    },
    interact: {
        title: "Интерактивті сабақ промттары",
        desc: "Ойын элементтері мен қызықты тапсырмалар идеясы.",
        prompt: "Математика сабағында [Тақырып] тақырыбына арналған [Қосымша] интерактивті ойын сценарийін ұсын."
    },
    test: {
        title: "Тест құрастыру промттары",
        desc: "БЖБ, ТЖБ немесе бекіту тестін жылдам дайындау.",
        prompt: "[Тақырып] бойынша [Қосымша] сұрақтан тұратын тест құрастыр. Жауаптарын бірге жаз."
    }
};

// --- 3. ПРОМТТАР ФУНКЦИЯЛАРЫ ---
function showCategory(key) {
    currentKey = key;
    document.querySelectorAll('.cat-item').forEach(el => el.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');
    
    document.getElementById('current-title').innerText = categories[key].title;
    document.getElementById('current-desc').innerText = categories[key].desc;
    updatePromptDisplay();
}

function updatePromptDisplay() {
    const topicInput = document.getElementById('topic-input');
    const extraInput = document.getElementById('extra-input');
    const promptDisplay = document.getElementById('prompt-text');

    if (!topicInput || !promptDisplay) return;

    let topic = topicInput.value || "[Тақырып]";
    let extra = extraInput.value || "[Қосымша]";
    let text = categories[currentKey].prompt.replace("[Тақырып]", topic).replace("[Қосымша]", extra);
    promptDisplay.innerText = text;
}

function copyPrompt() {
    const text = document.getElementById('prompt-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-btn');
        if(btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> Көшірілді';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-copy"></i> Промтты көшіру';
            }, 2000);
        }
    });
}

// --- 4. ШАБЛОНДАР БӨЛІМІ ---
const templates = {
    kmj: {
        title: "ҚМЖ Конструкторы",
        header: "Қысқа мерзімді жоспар",
        fields: [
            { label: "Сабақ тақырыбы:", id: "topic", type: "text", placeholder: "Мысалы: Пропорция" },
            { label: "Оқу мақсаты:", id: "goal", type: "textarea", placeholder: "Оқу бағдарламасынан мақсатты көшіріңіз..." }
        ]
    },
    eval: {
        title: "Бағалау критерийлері",
        header: "Бағалау парағы",
        fields: [
            { label: "Тапсырма атауы:", id: "topic", type: "text", placeholder: "Мысалы: Теңдеулерді шешу" },
            { label: "Дескрипторлар:", id: "goal", type: "textarea", placeholder: "1. Квадратты анықтайды..." }
        ]
    }
};

function loadTemplate(key) {
    const template = templates[key];
    if (!template) return;

    document.getElementById('template-title').innerText = template.title;
    const header = document.querySelector('.preview-header');
    if (header) header.innerText = template.header;

    const formPanel = document.querySelector('.form-panel');
    if (formPanel) {
        formPanel.innerHTML = ''; 
        template.fields.forEach(field => {
            const div = document.createElement('div');
            div.className = 'input-field';
            div.innerHTML = `
                <label>${field.label}</label>
                ${field.type === 'text' 
                    ? `<input type="text" id="${field.id}" placeholder="${field.placeholder}" oninput="updatePreview()">`
                    : `<textarea id="${field.id}" placeholder="${field.placeholder}" oninput="updatePreview()"></textarea>`
                }
            `;
            formPanel.appendChild(div);
        });
    }
    updatePreview();
}

function updatePreview() {
    // Барлық мүмкін болатын мәндерді жинаймыз
    const topicVal = document.getElementById('topic')?.value || "...";
    const goalVal = document.getElementById('goal')?.value || "...";
    const methodVal = document.getElementById('method')?.value || "..."; // Жаңадан қосылды

    const viewTopic = document.getElementById('view-topic');
    const viewGoal = document.getElementById('view-goal');
    const viewMethod = document.getElementById('view-method');
    const placeholder = document.querySelector('.preview-placeholder');

    if (viewTopic) viewTopic.innerText = topicVal;
    if (viewGoal) viewGoal.innerText = goalVal;
    if (viewMethod) viewMethod.innerText = methodVal;

    // Егер бәрі бос болса, подсказканы көрсетеміз
    if (placeholder) {
        placeholder.style.display = (topicVal === "..." && goalVal === "..." && methodVal === "...") ? 'block' : 'none';
    }
}
function fillWithAI() {
    const topicField = document.getElementById('topic');
    const goalField = document.getElementById('goal');
    const methodField = document.getElementById('method'); // Қосылды

    if (topicField && goalField) {
        topicField.value = "Квадрат теңдеулерді шешу";
        goalField.value = "8.2.2.1 - квадрат теңдеулердің түрлерін ажырату; 8.2.2.2 - квадрат теңдеулерді шешу жолдарын меңгеру.";
        if (methodField) methodField.value = "Сыни тұрғыдан ойлау, 'Миға шабуыл' әдісі, деңгейлік тапсырмалар.";
        
        updatePreview();
        alert("ЖИ көмегімен үлгі толтырылды!");
    } else {
        alert("Алдымен шаблонды таңдаңыз!");
    }
}
// --- 5. ҚҰРАЛДАР ---

// PDF сақтау
function saveAsPDF() {
    const element = document.getElementById('document-to-print');
    if (!element) return;
    const opt = {
        margin: 10,
        filename: 'TeachASM_Document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

// Рандомайзер
function openRandomizer() {
    const modal = document.getElementById('randomizer-modal');
    if (modal) modal.style.display = 'flex';
}

function closeRandomizer() {
    const modal = document.getElementById('randomizer-modal');
    if (modal) modal.style.display = 'none';
}

function pickStudent() {
    const listText = document.getElementById('student-list').value;
    const display = document.getElementById('display-name');
    const students = listText.split('\n').filter(s => s.trim() !== "");

    if (students.length === 0) {
        display.innerText = "Тізім бос!";
        return;
    }

    display.innerText = "Таңдалуда...";
    setTimeout(() => {
        const random = students[Math.floor(Math.random() * students.length)];
        display.innerText = random;
    }, 600);
}

// --- 6. МОДАЛЬДІ ТЕРЕЗЕ (openM) ---
function openM(t, d, u, i) {
    const titleEl = document.getElementById('m-title');
    const descEl = document.getElementById('m-desc');
    const iconEl = document.getElementById('m-icon');
    const linkBtn = document.getElementById('m-url');
    const modalView = document.getElementById('m-view');

    if (titleEl) titleEl.innerText = t || "";
    if (descEl) descEl.innerText = d || "";
    if (iconEl) iconEl.innerText = i || "";
    if (linkBtn) {
        linkBtn.href = u || "#";
        linkBtn.style.display = u ? "inline-block" : "none";
    }

    if (modalView) {
        modalView.style.display = 'flex';
        // Контентті ортаға келтіру
        const box = modalView.querySelector('.m-box');
        if (box) {
            box.style.display = "flex";
            box.style.flexDirection = "column";
            box.style.alignItems = "center";
            box.style.textAlign = "center";
        }
    }
}

function closeM() {
    const modalView = document.getElementById('m-view');
    if (modalView) modalView.style.display = 'none';
}

// Бет жүктелгенде
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('topic-input')?.addEventListener('input', updatePromptDisplay);
    document.getElementById('extra-input')?.addEventListener('input', updatePromptDisplay);
});
