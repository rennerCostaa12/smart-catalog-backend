# Boilerplate Node.js

Boilerplate com:

- Express
- TypeScript
- Sequelize com MySQL
- Validação com Yup
- Arquitetura em camadas: Controller, Model, Repository e Service

## Estrutura

```text
src/
  app.ts
  server.ts
  config/
  modules/
    payments/
      controllers/
      services/
      validators/
  shared/
    errors/
    http/
    middlewares/
```

## Como usar

1. Instale as dependências:

```bash
npm install
```

2. Crie o arquivo `.env` com base em `.env.example`.

3. Rode em desenvolvimento:

```bash
npm run dev
```

## Rotas de exemplo

- `GET /health`
- `POST /api/payments/pix`
- `GET /api/payments/pix/:paymentId/qrcode`
- `POST /api/payments/credit-card`
- `GET /api/catalog-clients/slug/:slug`

### Variáveis Asaas

```env
ASAAS_BASE_URL=https://api-sandbox.asaas.com/v3
ASAAS_API_KEY=substitua_pela_sua_chave_asaas
```

Use `https://api.asaas.com/v3` em `ASAAS_BASE_URL` quando for operar em produção.

### Payload `POST /api/payments/pix`

```json
{
  "customer": "cus_000000000000",
  "userId": 1,
  "catalogClientId": 1,
  "value": 100,
  "dueDate": "2026-06-01",
  "description": "Pedido #123",
  "externalReference": "123"
}
```

### Buscar QR Code Pix

Após criar a cobrança Pix, use o `id` retornado:

```http
GET /api/payments/pix/pay_000000000000/qrcode
```

A resposta contém `encodedImage`, `payload` e `expirationDate`.

### Payload `POST /api/payments/credit-card`

```json
{
  "customer": "cus_000000000000",
  "userId": 1,
  "catalogClientId": 1,
  "value": 100,
  "dueDate": "2026-06-01",
  "description": "Pedido #123",
  "externalReference": "123",
  "remoteIp": "127.0.0.1",
  "creditCard": {
    "holderName": "Jane Doe",
    "number": "4444444444444444",
    "expiryMonth": "12",
    "expiryYear": "2028",
    "ccv": "123"
  },
  "creditCardHolderInfo": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "cpfCnpj": "12345678909",
    "postalCode": "01001000",
    "addressNumber": "100",
    "phone": "11999999999"
  }
}
```

Também é possível substituir `creditCard` e `creditCardHolderInfo` por `creditCardToken` quando já houver um token válido para o cliente no Asaas.
