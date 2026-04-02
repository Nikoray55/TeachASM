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

function copyDynamicPrompt() {
    const text = document.getElementById('prompt-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("Промт көшірілді!");
    });
}

// --- 4. ШАБЛОНДАР БӨЛІМІ (ӘДІСТЕМЕЛІК КАБИНЕТ) ---
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
    },
    differentiation: {
        title: "Саралап оқыту",
        header: "Деңгейлік тапсырмалар жоспары",
        fields: [
            { label: "Тақырып:", id: "topic", type: "text", placeholder: "Күрделілігі бойынша бөлу..." },
            { label: "A, B, C деңгейлері:", id: "goal", type: "textarea", placeholder: "Әр деңгейге сипаттама..." }
        ]
    },
    feedback: {
        title: "Кері байланыс",
        header: "Рефлексия парағы",
        fields: [
            { label: "Сабақ кезеңі:", id: "topic", type: "text", placeholder: "Мысалы: Сабақ соңы" },
            { label: "Кері байланыс әдісі:", id: "goal", type: "textarea", placeholder: "Мысалы: Табыс сатысы..." }
        ]
    }
};

function loadTemplate(key) {
    const template = templates[key];
    if (!template) return;

    // Менюдегі белсенді күй
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');

    // Тақырыптарды жаңарту
    document.getElementById('template-title').innerText = template.title;
    document.querySelector('.preview-header').innerText = template.header;

    // Форманы құрастыру
    const formPanel = document.querySelector('.form-panel');
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
    updatePreview();
}

// Live Preview жаңарту (Шаблондар үшін)
function updatePreview() {
    const topicVal = document.getElementById('topic')?.value || "...";
    const goalVal = document.getElementById('goal')?.value || "...";
    
    const viewTopic = document.getElementById('view-topic');
    const viewGoal = document.getElementById('view-goal');
    const placeholder = document.querySelector('.preview-placeholder');

    if (viewTopic) viewTopic.innerText = topicVal;
    if (viewGoal) viewGoal.innerText = goalVal;

    if (placeholder) {
        placeholder.style.display = (topicVal === "..." && goalVal === "...") ? 'block' : 'none';
    }
}

// --- 5. ҚҰРАЛДАР (PDF, AI, ТАЙМЕР, РАНДОМАЙЗЕР) ---

// PDF сақтау (id="document-to-print" қолданылады)
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

// ЖИ-мен толтыру (Шаблондар үшін)
function fillWithAI() {
    const topicField = document.getElementById('topic');
    const goalField = document.getElementById('goal');

    if (topicField && goalField) {
        topicField.value = "Квадрат теңдеулерді шешу";
        goalField.value = "8.2.2.1 - квадрат теңдеулердің түрлерін ажырату; 8.2.2.2 - квадрат теңдеулерді шешу жолдарын меңгеру (дискриминант әдісі).";
        updatePreview();
        alert("ЖИ көмегімен мысал толтырылды!");
    } else {
        alert("Алдымен шаблонды таңдаңыз!");
    }
}

// Таймер
function toggleTimer() {
    let timeInput = prompt("Неше минутқа таймер қоямыз?", "5");
    if (timeInput) {
        alert(`Таймер ${timeInput} минутқа іске қосылды!`);
        let seconds = parseInt(timeInput) * 60;
        let timer = setInterval(() => {
            seconds--;
            if (seconds <= 0) {
                clearInterval(timer);
                alert("Уақыт аяқталды!");
            }
        }, 1000);
    }
}

// Рандомайзер (Модальді тереземен)
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
        display.style.color = "#ef4444";
        return;
    }

    display.style.color = "#64748b";
    display.innerText = "Таңдалуда...";

    // Аздаған кідіріспен (0.6 сек) таңдау эффектісі
    setTimeout(() => {
        const random = students[Math.floor(Math.random() * students.length)];
        display.innerText = random;
        display.style.color = "#2e7d32";
        display.style.transform = "scale(1.1)";
        
        setTimeout(() => {
            display.style.transform = "scale(1)";
        }, 200);
    }, 600);
}

// Бет жүктелгенде оқиғаларды тыңдау
document.addEventListener('DOMContentLoaded', () => {
    // Промттар инпуттарын тыңдау
    document.getElementById('topic-input')?.addEventListener('input', updatePromptDisplay);
    document.getElementById('extra-input')?.addEventListener('input', updatePromptDisplay);
});

let timerInterval;
let totalSeconds = 300; // 5 минут әдепкі бойынша
let remainingSeconds = 300;

const circle = document.getElementById('timer-progress');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

function openTimer() {
    document.getElementById('timer-modal').style.display = 'flex';
}

function closeTimer() {
    document.getElementById('timer-modal').style.display = 'none';
    clearInterval(timerInterval);
}

function updateTimerDisplay() {
    const mins = Math.floor(remainingSeconds / 60);
    const secs = remainingSeconds % 60;
    document.getElementById('time-left').innerText = 
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    
    // Шеңберді толтыру
    const offset = circumference - (remainingSeconds / totalSeconds) * circumference;
    circle.style.strokeDashoffset = offset;
}

function startCountdown() {
    clearInterval(timerInterval);
    
    // Пайдаланушыдан уақыт сұрау (егер жаңадан бастаса)
    if (remainingSeconds === totalSeconds) {
        const userTime = prompt("Неше минут? (1-60)", "5");
        if (userTime) {
            totalSeconds = parseInt(userTime) * 60;
            remainingSeconds = totalSeconds;
        }
    }

    timerInterval = setInterval(() => {
        remainingSeconds--;
        updateTimerDisplay();
        
        if (remainingSeconds <= 0) {
            clearInterval(timerInterval);
            alert("Уақыт аяқталды!");
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    remainingSeconds = totalSeconds;
    updateTimerDisplay();
}
// Промтты алмасу буферіне көшіру
function copyPrompt() {
    const text = document.getElementById('prompt-text').innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.copy-btn');
        btn.innerHTML = '<i class="fas fa-check"></i> Көшірілді';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-copy"></i> Промтты көшіру';
        }, 2000);
    });
}

// Рандомайзер терезесін ашу
function openRandomizer() {
    document.getElementById('randomizer-modal').style.display = 'flex';
}
function openM(t, d, u, i) {
    document.getElementById('m-title').innerText = t;
    document.getElementById('m-desc').innerText = d;
    document.getElementById('m-icon').innerText = i;
    
    // Батырманы тауып, оған URL-ді береміз
    const linkBtn = document.getElementById('m-url');
    if (linkBtn) {
        linkBtn.href = u;
        linkBtn.style.display = "inline-block"; // Көрініп тұруын қамтамасыз ету
    }

    document.getElementById('m-view').style.display = 'flex';
}