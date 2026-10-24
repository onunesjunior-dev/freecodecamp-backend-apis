# Family Movie Watchlist API

Projeto 5 de 5 da certificação **Back End Development and APIs** do freeCodeCamp.

API RESTful de lista de filmes por membro da família, com autenticação stateless via JWT
e controle de acesso por papel (RBAC): pais (`parent`) têm permissão total de edição em
qualquer lista; filhos (`child`) só podem editar a própria.

## Testes

23 de 23 asserções automatizadas: servidor na porta 3000; middleware `authenticate`
rejeitando requisição sem token (401) ou com token inválido/expirado (401), e anexando
`req.user` com token válido; middleware `authorizeModification` liberando pai irrestrito
e filho só na própria lista (403 pra terceiros); login com 400 (faltando credencial), 401
(usuário ou senha errados) e 200 + token (credenciais válidas); CRUD completo da watchlist
(`GET`/`POST`/`PUT`/`DELETE`) respeitando as regras de RBAC em cada verbo.

## Como ver funcionando

```bash
npm install
npm start
# POST http://localhost:3000/api/auth/login  { "username": "mom", "password": "parent123" }
# usa o token retornado no header Authorization: Bearer <token> nas rotas /api/watchlist/:userId
```

**Nota de transparência:** `utils/db.js` (persistência em arquivo) não estava com o código
exato documentado no caderno de estudo para as funções específicas deste projeto
(`findByUsername`, `getWatchlist`, `addMovie`, `updateMovie`, `deleteMovie`) — só a
descrição do comportamento esperado e os 23 testes. Reconstruí essa camada seguindo
exatamente o contrato documentado (mesmo padrão de leitura/escrita em JSON usado no
restante do módulo). O `index.js`, as rotas e os middlewares são o código original
documentado, sem alteração.

## Desafio original

https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/build-a-family-movie-watchlist-api

---
Parte do [currículo completo de Back End Development and APIs](../README.md) no freeCodeCamp.
