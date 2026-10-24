# Personal Profile App

Projeto 2 de 5 da certificação **Back End Development and APIs** do freeCodeCamp.

Servidor Express que funciona ao mesmo tempo como site tradicional (rotas estáticas com
texto sobre identidade, hobbies e habilidades) e como API JSON (`/api/profile`).

## Testes

5 user stories oficiais: servidor Express escutando na porta 3000; `GET /` retorna texto
fixo de boas-vindas; `GET /hobbies` e `GET /skills` retornam texto fixo; `GET /api/profile`
retorna JSON com `name`, `hobbies` (array) e `skills` (array), com `Content-Type:
application/json`.

## Como ver funcionando

```bash
npm install
npm start
# http://localhost:3000
```

## Desafio original

https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/build-a-personal-profile-app

---
Parte do [currículo completo de Back End Development and APIs](../README.md) no freeCodeCamp.
