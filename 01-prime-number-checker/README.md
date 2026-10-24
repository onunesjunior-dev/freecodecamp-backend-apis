# Prime Number Checker

Projeto 1 de 5 da certificação **Back End Development and APIs** do freeCodeCamp.

Módulo npm standalone que verifica se um número inteiro é primo, usando verificação
otimizada O(√n) (testa só divisores ímpares até a raiz quadrada do número).

## Testes

Cobre as *user stories* oficiais: `package.json` válido como pacote npm (`name`, `version`,
`description`, `keywords`, `license`, `author`, `type: "commonjs"`), `index.js` exportando
`isPrime` como named export via `module.exports`, retorno correto pra número primo e
não-primo (incluindo os casos de borda 0, 1 e negativos).

## Como ver funcionando

```js
const { isPrime } = require("./index.js");
isPrime(17); // true
isPrime(100); // false
```

## Desafio original

https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/build-a-prime-number-checker-module

---
Parte do [currículo completo de Back End Development and APIs](../README.md) no freeCodeCamp.
