# Bank API

Oficina do Módulo 8 (Tratamento de Erros no Express) — 34/34 passos, Express 5.
Transferência bancária (`POST /transfer`) com 5 camadas de validação defensiva,
health check com telemetria (`process.uptime`/`process.memoryUsage`), middleware
central de erro de 4 parâmetros e graceful shutdown em `SIGTERM`/`SIGINT`. O caderno
não mostra o código-fonte completo de `db.js` (persistência de `accounts.json`), só a
assinatura de `getAccounts()`/`saveAccounts()` — por isso ele não foi incluído aqui.
