let startTime, ended = false;

const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast and accurately is a great skill.",
  "Practice makes a person perfect in typing.",
  "JavaScript can be used to build interactive apps.",
  "Coding regularly improves logical thinking.",
  "Speed typing tests are helpful for improvement.",
  "Focus on accuracy before speed.",
  "Keyboard layout familiarity increases speed.",
  "Daily typing tests boost confidence.",
  "Avoid looking at the keyboard while typing.",
  "Stay calm and keep your hands on home row keys.",
  "Track your typing speed to measure progress.",
  "Use all fingers instead of just a few.",
  "Typing with rhythm helps maintain speed.",
  "Don't rush, focus on hitting the right keys."
];

let originalText = "";
const textBox = document.getElementById("text-to-type");
const inputBox = document.getElementById("input-box");
const countdownDiv = document.getElementById("countdown");

// Initialize Test - picks random text, resets UI and starts countdown
function initTest() {
  ended = false;
  originalText = texts[Math.floor(Math.random() * texts.length)];
  
  // Wrap each char in a span for styling correctness
  textBox.innerHTML = originalText
    .split("")
    .map(char => `<span class="char">${char}</span>`)
    .join("");
  
  inputBox.value = "";
  inputBox.disabled = true;
  inputBox.focus();
  document.getElementById("results").innerHTML = "";
  countdownDiv.innerText = "";
  
  startCountdown();
}

// Countdown before starting typing test
function startCountdown() {
  let timeLeft = 3;
  countdownDiv.innerText = `Starting in ${timeLeft}...`;

  const interval = setInterval(() => {
    timeLeft--;
    if (timeLeft === 0) {
      clearInterval(interval);
      countdownDiv.innerText = "";
      inputBox.disabled = false;
      inputBox.focus();
      startTime = new Date();
    } else {
      countdownDiv.innerText = `Starting in ${timeLeft}...`;
    }
  }, 1000);
}

// Listen to input and highlight correctness in real time
inputBox.addEventListener("input", function () {
  if (ended) return;

  const input = inputBox.value;
  const chars = textBox.querySelectorAll(".char");

  for (let i = 0; i < chars.length; i++) {
    const expectedChar = originalText[i];
    const typedChar = input[i];

    if (typedChar == null) {
      chars[i].classList.remove("correct", "incorrect");
    } else if (typedChar === expectedChar) {
      chars[i].classList.add("correct");
      chars[i].classList.remove("incorrect");
    } else {
      chars[i].classList.add("incorrect");
      chars[i].classList.remove("correct");
    }
  }

  // When the user finishes typing the entire sentence (length matches)
  // but also allow a slight tolerance for last character completion
  if (input.length >= originalText.length) {
    ended = true;
    endTest();
  }
});

// End test: disable input, calculate and show results, send to backend
function endTest() {
  inputBox.disabled = true;
  const endTime = new Date();
  const totalTime = (endTime - startTime) / 1000;

  const input = inputBox.value;
  const wordCount = input.trim().split(/\s+/).length;
  const wpm = Math.round((wordCount / totalTime) * 60);

  const accuracy = calculateAccuracy(input, originalText);

  document.getElementById("results").innerHTML = `
    ⏱ Time: ${totalTime.toFixed(2)} sec<br>
    ✍️ Words per minute: ${wpm} WPM<br>
    🎯 Accuracy: ${accuracy}%
  `;

  sendResultToBackend("shantanu", wpm, accuracy, totalTime);
}

// Calculate character-by-character accuracy
function calculateAccuracy(input, reference) {
  const inputChars = input.split("");
  const referenceChars = reference.split("");

  let correct = 0;
  for (let i = 0; i < referenceChars.length; i++) {
    if (inputChars[i] === referenceChars[i]) correct++;
  }
  return Math.round((correct / referenceChars.length) * 100);
}

// Send results to backend API
function sendResultToBackend(username, wpm, accuracy, timeSeconds) {
  fetch("http://localhost:8080/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, wpm, accuracy, timeSeconds }),
  })
    .then(res => res.json())
    .then(data => console.log("Saved:", data))
    .catch(err => console.error("Error:", err));
}

// Restart button handler
function restartTest() {
  initTest();
}

// Start the test when page loads
window.onload = initTest;
