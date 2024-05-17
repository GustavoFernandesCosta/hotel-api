# Hotel API

A Hotel API é uma API desenvolvida para uma avaliação técnica com o objetivo de implementar um sistema de reservas hoteleiras. Esta API permite gerenciar reservas, informações de hóspedes e outras funcionalidades relacionadas a hotéis.

## 🚀 Começando

Siga as instruções abaixo para obter uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Certifique-se de ter os seguintes pré-requisitos instalados em sua máquina:

- [Node.js 18.20.1](https://nodejs.org/) ou superior
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

### 🔧 Instalação

1. **Clone o repositório**:
    ```bash
    git clone https://github.com/GustavoFernandesCosta/hotel-api.git
    cd hotel-api
    ```

2. **Instale as dependências**:
    ```bash
    npm install
    ```

    Ou, se preferir utilizar Yarn:

    ```bash
    yarn install
    ```

3. **Configure as variáveis de ambiente**:

    Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente necessárias para o projeto. Você pode se basear em um arquivo de exemplo como `.env.example`, se houver.

4. **Suba o container com o banco de dados**:
    ```bash
    docker-compose up -d
    ```

5. **Inicie o servidor em ambiente de desenvolvimento**:
    ```bash
    npm start:dev
    ```

    Ou, se estiver usando Yarn:

    ```bash
    yarn start:dev
    ```

O servidor será iniciado em `http://localhost:3000`.

6. **criação de pastas**:

    Crie na raiz do projeto as pastas: public/reservas e public/uploads/payments

## 🛠️ Tecnologias Utilizadas

- **Node.js** para o backend.
- **TypeScript** para desenvolvimento de código seguro e tipado.
- **MongoDB** para o banco de dados.
- **Mongoose** para interagir com o banco de dados MongoDB.
- **Docker** para containerização do banco de dados.
- **Express** para criação do servidor web.
- **JWT** para autenticação de usuários.
- **Multer** para manipulação de arquivos enviados por usuários.
- **Puppeteer** para geração de PDFs.
- **Bcrypt** para criptografia de senhas.
