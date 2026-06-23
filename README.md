# Backend Smart Catalog

Backend Smart Catalog e uma API REST para gerenciamento de catalogos digitais, produtos, pedidos, usuarios, administradores e pagamentos. O projeto atende um fluxo de catalogo online em que clientes podem consultar produtos por catalogo, criar pedidos e realizar pagamentos via Pix ou cartao de credito usando a integracao com o Asaas.

## O que o projeto faz

- Cadastro e autenticacao de usuarios e administradores.
- Gerenciamento de catalogos de clientes.
- Gerenciamento de produtos vinculados a catalogos e categorias.
- Criacao, listagem, consulta e remocao de pedidos.
- Controle de itens de pedido.
- Integracao com Asaas para pagamentos Pix e cartao de credito.
- Consulta de QR Code Pix para pagamentos criados.
- Protecao de rotas com autenticacao JWT e regras de acesso para administradores.

## Arquitetura

O projeto usa uma arquitetura modular em camadas. Cada dominio da aplicacao fica dentro de `src/modules`, com suas proprias rotas, controllers, services, DTOs, validators e models quando necessario.

### Camadas principais

- `routes`: definem os endpoints HTTP, middlewares e validacoes de entrada.
- `controllers`: recebem a requisicao, chamam os services e formatam a resposta HTTP.
- `services`: concentram as regras de negocio e a orquestracao das operacoes.
- `models`: representam as entidades Sequelize e seus relacionamentos.
- `dtos`: definem os contratos de entrada usados pelos services.
- `validators`: schemas Yup usados para validar o corpo das requisicoes.
- `shared`: codigo reutilizavel, como tratamento de erros, respostas HTTP, autenticacao, hash de senha e middlewares.

## Modulos

### Auth

Responsavel por registro e login de usuarios e administradores. Os tokens sao assinados com a configuracao de autenticacao da aplicacao e usados pelos middlewares de protecao de rota.

### Users e Admin

Representam os dois tipos de conta do sistema. Usuarios estao ligados ao fluxo de pedidos, enquanto administradores podem acessar rotas administrativas protegidas.

### Catalog Clients

Gerencia os catalogos dos clientes da plataforma. Cada catalogo possui dados como nome, slug e descricao, e pode ter produtos e pagamentos relacionados.

### Products e Categories Products

Gerencia produtos do catalogo, incluindo nome, descricao, valor, imagem, categoria e catalogo de origem. A rota de listagem por catalogo permite expor produtos publicamente por nome/slug de catalogo.

### Orders e Order Items

Gerencia pedidos e seus itens. Pedidos possuem status, usuario, catalogo, total e lista de produtos comprados. Rotas de pedidos exigem autenticacao, e a remocao de pedido exige permissao de administrador.

### Payments

Integra com o Asaas para criar cobrancas Pix e cartao de credito. Tambem permite buscar os dados do QR Code Pix de uma cobranca existente.

## Tecnologias

- Node.js
- Express
- TypeScript
- Sequelize
- MySQL
- Sequelize CLI
- Yup
- dotenv
- CORS
- ts-node-dev

## Banco de dados

O projeto usa MySQL com Sequelize. As migrations ficam em `src/database/migrations` e criam as tabelas principais:

Os models sao inicializados em `src/config/database.ts`, onde tambem sao configuradas as associacoes entre entidades.

## Variaveis de ambiente

Crie um arquivo `.env` com base em `.env.example`.

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=boilerplate_nodejs
DB_USER=root
DB_PASSWORD=root

ASAAS_BASE_URL=https://api-sandbox.asaas.com/v3
ASAAS_API_KEY=substitua_pela_sua_chave_asaas
AUTH_SECRET=development-auth-secret
```

Para producao no Asaas, use:

```env
ASAAS_BASE_URL=https://api.asaas.com/v3
```

## Como executar

Instale as dependencias:

```bash
npm install
```

Execute as migrations:

```bash
npm run migration:up
```

Rode em desenvolvimento:

```bash
npm run dev
```

Gere o build:

```bash
npm run build
```

Execute a versao compilada:

```bash
npm start
```

Verifique os tipos TypeScript:

```bash
npm run typecheck
```

## Scripts disponiveis

- `npm run dev`: inicia a API em modo desenvolvimento com `ts-node-dev`.
- `npm run build`: compila o TypeScript para `dist`.
- `npm start`: executa `dist/server.js`.
- `npm run typecheck`: roda `tsc --noEmit`.
- `npm run migration:create -- nome-da-migration`: cria uma migration com Sequelize CLI.
- `npm run migration:up`: executa migrations pendentes.
- `npm run migration:down`: desfaz a ultima migration.

## Autenticacao e autorizacao

A autenticacao e baseada em token Bearer no header `Authorization`.

```http
Authorization: Bearer seu_token
```

O middleware `requireAuth` valida tokens autenticados. O middleware `requireAdminAuth` valida tokens de administradores e bloqueia acessos sem permissao administrativa.

## Tratamento de erros e respostas

O projeto centraliza erros com `AppError` e `errorHandler`. As respostas HTTP usam helpers em `src/shared/http/responses.ts`, mantendo um formato consistente para sucesso e falha.

## Integracao Asaas

O modulo de pagamentos usa `AsaasPaymentsService` para comunicar com a API do Asaas. Ele cria cobrancas Pix e cartao de credito e busca informacoes de QR Code Pix.
