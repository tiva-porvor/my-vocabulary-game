const wordBank = [
    { word: "Ability", translation: "ความสามารถ", category: "A" },
    { word: "Analyze", translation: "วิเคราะห์", category: "A" },
    { word: "Beautiful", translation: "สวยงาม", category: "B" },
    { word: "Business", translation: "ธุรกิจ", category: "B" },
    // สามารถเพิ่มคำศัพท์จากไฟล์ CSV ที่คุณมีลงในนี้ได้เลย
];

let currentWord = {};
let stats = { total: 0, correct: 0, wrong: 0 };
let currentCategoryWords = [];

// สร้างปุ่ม A-Z
const alphabetContainer = document.getElementById('alphabet-buttons');
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(letter => {
    const btn = document.createElement('button');
    btn.innerText = letter;
    btn.className = 'alphabet-btn';
    btn.onclick = () => startGame(letter);
    alphabetContainer.appendChild(btn);
});

function startGame(letter) {
    currentCategoryWords = wordBank.filter(w => w.category === letter);
    if (currentCategoryWords.length === 0) {
        alert("ยังไม่มีคำศัพท์หมวด " + letter);
        return;
    }
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    nextQuestion();
}

function updateStats() {
    document.getElementById('total-val').innerText = stats.total;
    document.getElementById('correct-val').innerText = stats.correct;
    document.getElementById('wrong-val').innerText = stats.wrong;
}

function nextQuestion() {
    document.getElementById('feedback').innerText = "";
    currentWord = currentCategoryWords[Math.floor(Math.random() * currentCategoryWords.length)];
    document.getElementById('word-display').innerText = currentWord.word;

    let options = [currentWord.translation];
    while (options.length < 4) {
        let randomWord = wordBank[Math.floor(Math.random() * wordBank.length)].translation;
        if (!options.includes(randomWord)) options.push(randomWord);
    }
    options.sort(() => Math.random() - 0.5);

    const container = document.getElementById('options-container');
    container.innerHTML = "";
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'option';
        btn.onclick = () => checkAnswer(opt);
        container.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const feedback = document.getElementById('feedback');
    stats.total++; // นับจำนวนครั้งที่ตอบทั้งหมด

    if (selected === currentWord.translation) {
        stats.correct++;
        feedback.innerText = "ถูกต้อง! 🎉";
        feedback.style.color = "#28a745";
        // หน่วงเวลาเล็กน้อยก่อนไปข้อต่อไป
        setTimeout(nextQuestion, 1000);
    } else {
        stats.wrong++;
        feedback.innerText = "ผิดครับ! ❌";
        feedback.style.color = "#dc3545";
    }
    updateStats();
}