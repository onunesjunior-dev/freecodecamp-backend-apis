# Timestamp Microservice

Projeto 3 de 5 da certificação **Back End Development and APIs** do freeCodeCamp.

Microsserviço REST que recebe uma data (ISO, texto livre analisável por `new Date()`, ou
timestamp Unix em milissegundos) e retorna os dois formatos: `unix` (ms) e `utc` (RFC 1123).

## Testes

7 user stories oficiais: `GET /api/:date?` com data válida retorna `unix` e `utc`; aceita
timestamp Unix puro (tratando a armadilha de string numérica, que o `new Date()` do
JavaScript não interpreta como milissegundos sem conversão explícita); aceita qualquer
string analisável por `new Date()`; data inválida retorna `{ error: "Invalid Date" }`;
`GET /api` sem parâmetro retorna a data/hora atual.

## Como ver funcionando

```bash
npm install
npm start
# http://localhost:8000/api/2015-12-25
```

## Desafio original

https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/build-a-timestamp-microservice

---
Parte do [currículo completo de Back End Development and APIs](../README.md) no freeCodeCamp.
