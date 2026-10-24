# Chat App

Projeto 4 de 5 da certificação **Back End Development and APIs** do freeCodeCamp.

Servidor de bate-papo multi-cliente em tempo real usando WebSockets nativos do Node.js
(`ws`) sobre um servidor HTTP (`http.createServer`). Broadcast de mensagens de sistema
(entrada/saída de usuário) e mensagens de chat pra todos os clientes conectados.

## Testes

7 user stories oficiais, todas no `server.js`: servidor HTTP servindo `public/index.html`;
`WebSocketServer` acoplado ao servidor HTTP; listener de `connection` extraindo `username`
da query string; broadcast de entrada/saída e de cada mensagem de chat (com guarda
`readyState === WebSocket.OPEN` antes de enviar); servidor escutando na porta 3001.

**Nota de transparência:** o `server.js` é o código avaliado pela certificação, documentado
por completo no caderno de estudo. O cliente (`public/index.html` e `public/script.js`) é
uma interface simples que eu montei agora só pra dar pra testar visualmente — não fazia
parte do que foi avaliado pelos testes automatizados do freeCodeCamp.

## Como ver funcionando

```bash
npm install
npm start
# abra http://localhost:3001 em duas abas/janelas diferentes pra testar o chat
```

## Desafio original

https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/build-a-chat-app

---
Parte do [currículo completo de Back End Development and APIs](../README.md) no freeCodeCamp.
