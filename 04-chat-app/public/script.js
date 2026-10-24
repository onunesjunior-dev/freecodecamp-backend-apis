const messagesEl = document.getElementById("messages");
const usernameEl = document.getElementById("username");
const textEl = document.getElementById("text");
const sendEl = document.getElementById("send");

let socket;

function connect() {
  const username = usernameEl.value || "anônimo";
  socket = new WebSocket(`ws://${location.host}?username=${encodeURIComponent(username)}`);

  socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    const line = document.createElement("div");
    line.textContent = data.type === "chat" ? `${data.username}: ${data.text}` : data.text;
    messagesEl.appendChild(line);
  });
}

sendEl.addEventListener("click", () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    connect();
    socket.addEventListener("open", sendMessage, { once: true });
  } else {
    sendMessage();
  }
});

function sendMessage() {
  socket.send(JSON.stringify({ username: usernameEl.value || "anônimo", text: textEl.value }));
  textEl.value = "";
}
