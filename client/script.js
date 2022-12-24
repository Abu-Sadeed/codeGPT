import bot from "./assets/assets/bot.svg";
import user from "./assets/assets/user.svg";

const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

let loadInterval;

const loader = (element) => {
  element.textContent = "";

  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
};

const typeText = (element, text) => {
  let index = 0;

  let interval = setInterval((element, text) => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
};

const generateUniqueId = () => Date.now().toString(36);

const chatStripe = (isAI, value, uniqueId) => {
  return `<div class="wrapper ${isAI && "ai"}">
      <div class="chat">
        <div class="profile">
          <img src="${isAI ? bot : user}" alt="${isAI ? "bot" : "user"}"/>
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>`;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  // User chat
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset();

  const uniqueId = generateUniqueId();

  chatContainer.innerHTML += chatStripe(true, "", uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
};

form.addEventListener("submit", handleSubmit);
form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
