# Resource Monitor

Oficina do Módulo 9 (WebSockets) — servidor HTTP nativo compartilhando porta com
`WebSocketServer` (biblioteca `ws`), que faz streaming de métricas de hardware
(`os.loadavg`, `os.freemem`, `os.totalmem`) a cada 1s para o front-end (`public/script.js`),
com limpeza de `interval` no `close` para evitar vazamento de memória. O `index.html`
servido pelo backend não aparece com código completo no caderno, só a referência ao
arquivo — por isso não foi incluído aqui.
