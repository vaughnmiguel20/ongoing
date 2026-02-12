// Function to open service pages (alerts for coming soon)
function openService(type) {
  if (type === "services") {
    alert("E-Services page coming soon!");
  } else if (type === "officials") {
    alert("Barangay Officials page coming soon!");
  } else if (type === "news") {
    alert("News & Announcements page coming soon!");
  }
}

// Handle "Request Service" button clicks
document.querySelectorAll(".service-card button").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Service request feature coming soon!");
  });
});

// Carousel logic
let currentIndex = 0;
const dots = document.querySelectorAll(".dot");

function updateDots() {
  dots.forEach(dot => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % dots.length;
  updateDots();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + dots.length) % dots.length;
  updateDots();
}

// Handle news card clicks
document.querySelectorAll(".news-card").forEach(card => {
  card.addEventListener("click", () => {
    alert("News article page coming soon!");
  });
});

// Form submission handler (for account registration)
document.querySelector(".register-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("Account submitted! Await admin approval.");
});

// Scroll to top functionality
document.querySelector(".scroll-top").addEventListener("click", e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Open YouTube video
function openYoutube() {
  window.open(
    "https://youtu.be/KY8gZCD0Ou0?si=GzNSJ3R0lMddwe1b",
    "_blank"
  );
}

// Login user function
function loginUser(e) {
  e.preventDefault();

  // Simulate successful login
  localStorage.setItem("isLoggedIn", "true");

  // Redirect to requested page if exists, or homepage
  const redirect = localStorage.getItem("redirectAfterLogin");
  if (redirect) {
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirect;
  } else {
    window.location.href = "index.html";
  }
}

// Optional: If you have a login form, you can use the following:
document.querySelector("#loginForm").addEventListener("submit", loginUser);

// Function to append messages to the chatbox
function appendMessage(content, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender);
  messageDiv.textContent = content;
  document.getElementById('messages').appendChild(messageDiv);
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight; // Scroll to the bottom
}

// Function to send message to the Node.js backend
async function getBotResponse(userMessage) {
  const response = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: userMessage
    })
  });

  const data = await response.json();
  return data.message;
}

// Handle the message sending logic
// Function to handle user input and bot response
async function handleMessage() {
    const message = document.getElementById('userInput').value;
    console.log("Button clicked, message:", message); // Debugging line

    if (message.trim() !== '') {
        appendMessage(message, 'user');  // Show user's message
        document.getElementById('userInput').value = ''; // Clear input box
        const botResponse = await getBotResponse(message); // Get response from server
        appendMessage(botResponse, 'bot');  // Show bot's response
    } else {
        console.log("Input is empty!"); // Debugging line
    }
}


// Event listener for the send button
document.getElementById('sendBtn').addEventListener('click', handleMessage);

// Optional: Allow the "Enter" key to send the message
document.getElementById('userInput').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    handleMessage();
  }
});

document.getElementById('sendBtn').addEventListener('click', handleMessage);

// Elements
const chatWindow = document.getElementById('chatWindow');
const chatbotIcon = document.getElementById('chatbotIcon');
const closeChatBtn = document.getElementById('closeChat');
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const messagesDiv = document.getElementById('messages');
const chatIndicator = document.getElementById('chatIndicator');

// Toggle chat window visibility
chatbotIcon.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    chatIndicator.style.display = 'none'; // Hide indicator once chat is opened
});

// Close chat window
closeChatBtn.addEventListener('click', () => {
    chatWindow.style.display = 'none';
});

// Append messages to the chat window
function appendMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add(sender);
    messageDiv.textContent = content;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
}

// Send message to server and get response
async function getBotResponse(userMessage) {
    const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: userMessage
        })
    });

    const data = await response.json();
    return data.message;
}

// Handle sending messages
async function handleMessage() {
    const message = userInput.value;
    if (message.trim() !== '') {
        appendMessage(message, 'user');
        userInput.value = ''; // Clear input box
        const botResponse = await getBotResponse(message);
        appendMessage(botResponse, 'bot');
    }
}

// Send button click event
sendBtn.addEventListener('click', handleMessage);

// Enter key event for sending messages
userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleMessage();
    }
});
