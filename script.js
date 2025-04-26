const streamId = "748c0ff7"; // o teu streamId
const socket = new WebSocket(`wss://io.socialstream.ninja?streamId=${streamId}`);
const messagesDiv = document.getElementById('messages');

socket.addEventListener("open", () => {
  messagesDiv.textContent = "✅ Ligação estabelecida. À espera de mensagens...";
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  console.log("Recebido:", data);

  const time = new Date().toLocaleTimeString();
  messagesDiv.textContent += `\n\n[${time}] Tipo: ${data.type || "sem tipo"}\nMensagem: ${data.message || "sem mensagem"}`;
});

socket.addEventListener("error", (error) => {
  messagesDiv.textContent += `\n\n❌ Erro no WebSocket: ${error.message}`;
});

socket.addEventListener("close", () => {
  messagesDiv.textContent += "\n\n⚠️ Ligação fechada.";
});
