const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  setStatus("Connected");
};

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateMetrics(data);
};

socket.onclose = () => {
  setStatus("Disconnected");
};

socket.onerror = (err) => {
  console.error("WebSocket error:", err);
};
