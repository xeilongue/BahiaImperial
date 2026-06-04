# 🏦 Bahia Imperial — Sistema de Banco Digital

## 1. Descrição do Projeto

O **Bahia Imperial** é um sistema de Banco Digital com o objetivo de oferecer uma plataforma web segura e intuitiva para gerenciamento de contas bancárias de pessoas físicas (CPF) e jurídicas (CNPJ), permitindo operações financeiras essenciais com acompanhamento em tempo real de saldo e histórico de transações.

---

## 2. Tecnologias Utilizadas

| Categoria | Tecnologias |
|---|---|
| **Linguagens** | C#, HTML, CSS, TypeScript |
| **Frameworks** | .NET, Entity Framework Core, Bootstrap |
| **Biblioteca** | React |
| **Banco de Dados** | MySQL |
| **Segurança** | JSON Web Token (JWT) |
| **Documentação de API** | Swagger |

---

## 3. Instruções de Execução

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- [.NET SDK](https://dotnet.microsoft.com/download) (compatível com a versão 10.0)
- [EF Core CLI](https://learn.microsoft.com/pt-br/ef/core/cli/dotnet)
- [Node.js e npm](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

---

### 3.1. Clonar o Repositório

```bash
git clone https://github.com/xeilongue/BahiaImperial.git
cd BahiaImperial
```

> 💡 **Alternativa:** Se preferir, faça o download do arquivo `.zip` diretamente pela interface do GitHub e extraia o conteúdo na sua máquina.

---

### 3.2. Configurar e Executar o Backend (API)

No arquivo `appsettings.json`, configure a string de conexão:

```json
"ConnectionStrings": {
  "DefaultConnection": "server=localhost;database=bahia_imperial;user=root;password={suaSenha}"
}
```

Em seguida, execute:

```bash
cd BahiaImperial_API
dotnet build
dotnet ef database update
dotnet run
```

> **Nota:** Mantenha este terminal aberto para acompanhar os logs da API.

---

### 3.3. Configurar e Executar o Frontend (Client)

Abra um **novo terminal** e execute:

```bash
cd bahiaimperial_client
npm install
npm run dev
```

---

### 3.4. Acessar a Aplicação

O terminal exibirá a URL local gerada:
http://localhost:5173

---

## 4. Endpoints da API

> Obs.: Todos os endpoints começam com `http://localhost:5042/`

---

**Autenticação /auth**

- POST `/login` - Autentica o usuário e retorna um token JWT

body = { "cpf_Cnpj": string, "password": string }

---

**Gerenciamento de usuários /user**

- GET `/All` - Lista todos os usuários
- GET `/GetById?userId={id}` - Busca usuário por ID (CPF/CNPJ)
- POST - Cadastra um novo usuário
- DELETE - Remove um usuário pelo ID

---

**Gerenciamento de clientes /client**

- GET - Lista todos os clientes
- GET `/GetById/{clientId}` - Busca cliente por ID
- POST - Cadastra um novo cliente

---

**Gerenciamento de contas /account**

- GET - Lista todas as contas
- GET `/ByUserId` - Lista contas do usuário autenticado
- POST - Cadastra uma nova conta

---

**Gerenciamento de transações /transaction**

- GET - Lista todas as transações
- GET `/history/{accountId}` - Retorna o histórico de transações de uma conta
- POST `/deposit` - Realiza um depósito
- POST `/withdraw` - Realiza um saque

body = { "accountId": int, "amount": decimal }
