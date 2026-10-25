# Exercícios (oficinas e laboratórios)

Enquanto os 5 projetos na raiz deste repositório são os **projetos obrigatórios de
certificação**, esta pasta guarda as **oficinas práticas** (seções `[Workshop]`/`[Oficina]`
do [[Caderno de Estudo - Desenvolvimento Back-end e APIs]]) resolvidas ao longo do
currículo — exercícios menores, mas reais, que também fazem parte da nota de
certificação da plataforma.

## Estrutura

Uma pasta por módulo, nome sempre em **inglês** (o portfólio é lido por recrutadores
que não leem português, mesmo com o caderno-fonte em PT-BR):

```
exercises/
├── module-04-http-and-web-protocol-stack/
│   ├── README.md
│   └── 01-multi-page-web-server/
│       ├── README.md
│       └── server.js
├── module-05-introduction-to-express/
│   └── 01-random-joke-app/
├── module-06-express-middleware/
│   └── 01-submission-form-api/
├── module-07-rest-apis-and-web-services/
│   └── 01-weather-service-api/
├── module-08-express-error-handling/
│   └── 01-bank-api/
├── module-09-websockets/
│   └── 01-resource-monitor/
└── module-11-authentication/
    └── 01-jwt-protected-routes/
```

Cada módulo tem seu próprio `README.md` com uma tabela (`# | Exercício | Tipo`), e cada
exercício fica na sua própria pasta numerada (`NN-slug-em-ingles/`), com um `README.md`
curto (nome como H1, tipo + módulo + quantidade de passos, uma frase técnica sobre o
que o código demonstra) e os arquivos de código extraídos **literalmente** do bloco de
código final e consolidado do caderno — nunca fragmentos de passo-a-passo, nunca código
completado ou inventado.

## Módulos sem oficina extraída

- **Módulo 1, 2 e 3** — têm seção de oficina, mas sem bloco de código final consolidado
  no caderno (só REPL/lições fragmentadas ou tabela-síntese). Pulados, sem inventar.
- **Módulo 10 e 12** — não têm seção de oficina (só Teoria/Revisão/Quiz).
- **Módulos 7, 9 e 11** — a oficina está aqui, mas o **projeto de certificação** do
  mesmo módulo já está na raiz do repositório (ver README raiz) e não é duplicado aqui.
