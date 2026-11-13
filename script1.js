
const questions = [
    {
        question: "Which of the following statements about the Fundamental Rights is correct?",
        options: ["They are available only to citizens", "They are enforceable by courts", "They cannot be amended", "They are mentioned in Part IV"],
        answer: "They are enforceable by courts"
    },
    {
        question: "Who founded the Indian National Congress in 1885?",
        options: ["Bal Gangadhar Tilak", " Dadabhai Naoroji", "A.O. Hume", "Mahatma Gandhi"],
        answer: "A.O. Hume"
    },
    {
        question: "Which of the following is a biodiversity hotspot in India?",
        options: [" Western Ghats", "Thar Desert", "Indo-Gangetic Plain", " Deccan Plateau"],
        answer: " Western Ghats"
    },
    {
        question: "Which of the following rivers flows westward and drains into the Arabian Sea?",
        options: [
            "Godavari",
            "Mahanadi",
            "Krishna",
            "Narmada"
        ],
        answer: "Narmada"
    },
    {
        question: "Which gas is primarily responsible for ozone layer depletion?",
        options: ["Chlorofluorocarbons (CFCs)", "Hydrogen", "Nitrogen", "Oxygen"],
        answer: " Chlorofluorocarbons (CFCs)"
    },
     {
        question: "Who introduced the Permanent Settlement in Bengal in 1793?",
        options: ["Lord Dalhousie", "Lord Wellesley", "Lord Curzon", "Lord Cornwallis"],
        answer: "Lord Cornwallis"
    },
     {
        question: "Which Article of the Indian Constitution deals with the abolition of untouchability?",
        options: ["Article 21", "Article 17", "Article 24", "Article 19"],
        answer: "Article 17"
    },
     {
        question: "The Ramsar Convention is primarily associated with the conservation of:",
        options: ["Forests", "Deserts", "Wetlands", "Mountains"],
        answer: "Wetlands"
    },
     {
        question: "Which layer of the atmosphere contains the ozone layer?",
        options: ["Stratosphere", "Thermosphere", "Mesosphere", "Troposphere"],
        answer: "Stratosphere"
    },
     {
        question: "Which of the following is used as a fuel in nuclear reactors?",
        options: ["Carbon-12", "Uranium-235", "Oxygen-16", "Helium-4"],
        answer: "Uranium-235"
    },
     {
        question: "What is the primary objective of monetary policy in India?",
        options: ["Controlling state budgets", "Collecting income tax", "Controlling inflation and maintaining price stability", "Increasing exports only"],
        answer: "Controlling inflation and maintaining price stability"
    },
     {
        question: "Which institution is responsible for issuing currency notes in India, except the one-rupee note?",
        options: ["NITI Aayog", "State Bank of India", "Ministry of Finance", "Reserve Bank of India"],
        answer: "Reserve Bank of India"
    },
     {
        question: "Which Article of the Indian Constitution provides for the Election Commission of India?",
        options: ["Article 324", "Article 370", "Article 356", "Article 280"],
        answer: "Article 324"
    },
     {
        question: "Which Indian state receives the highest average annual rainfall?",
        options: ["Rajasthan", "Gujarat", "Meghalaya", "Haryana"],
        answer: "Meghalaya"
    },
     {
        question: "Which of the following taxes is an indirect tax in India?",
        options: ["Income Tax", "Corporate Tax", "Capital Gains Tax", "Goods and Services Tax"],
        answer: "Goods and Services Tax"
    },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 35;
let timerInterval;
let selected = false;


// Start Quiz
function startQuiz() {

    document.getElementById("home-screen").classList.add("hide");
    document.getElementById("result-screen").classList.add("hide");
    document.getElementById("quiz-screen").classList.remove("hide");

    currentQuestion = 0;
    score = 0;

    showQuestion();
}


// Show Question
function showQuestion() {

    selected = false;
    timeLeft = 35;

    document.getElementById("next-btn").disabled = true;

    document.getElementById("question-number").innerText =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("question").innerText =
        questions[currentQuestion].question;

    const optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = "";

    questions[currentQuestion].options.forEach(option => {

        const btn = document.createElement("div");

        btn.className = "option";
        btn.innerText = option;

        btn.onclick = () => selectAnswer(btn, option);

        optionsDiv.appendChild(btn);

    });

    startTimer();
}


// Select Answer
function selectAnswer(button, answer) {

    if (selected) return;

    selected = true;

    clearInterval(timerInterval);

    const correctAnswer = questions[currentQuestion].answer;

    if (answer === correctAnswer) {
        score++;
    }

    // Highlight Selected Answer Only
    button.classList.add("selected");

    document.getElementById("next-btn").disabled = false;
}


// Timer
function startTimer() {

    document.getElementById("timer").innerText =
        `⏱ ${timeLeft}`;

    timerInterval = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").innerText =
            `⏱ ${timeLeft}`;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            selected = true;

            document.getElementById("next-btn").disabled = false;

        }

    }, 1000);
}


// Next Question
function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }
}


// Final Result
function showResult() {

    clearInterval(timerInterval);

    document.getElementById("quiz-screen").classList.add("hide");
    document.getElementById("result-screen").classList.remove("hide");

    let wrong = questions.length - score;

    document.getElementById("score").innerText =
        `Your Score: ${score} / ${questions.length}`;

    document.getElementById("message").innerText =
        `Correct Answers: ${score} | Wrong Answers: ${wrong}`;

}


// Restart Quiz
function restartQuiz() {

    startQuiz();

}
