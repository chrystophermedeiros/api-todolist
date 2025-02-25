<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
 <p align="center">Uma estrutura <a href="http://nodejs.org" target="_blank">Node.js</a> progressiva para criar aplicativos do lado do servidor eficientes e escaláveis.</p>
    <p align="center">

<p align="center">Documentação do <a href="https://docs.nestjs.com/" target="_blank">Nestjs</a>.</p>
    <p align="center">


# 📌 API To-Do List

A API To-Do List permite gerenciar tarefas com operações CRUD (criação, leitura, atualização e exclusão). Os usuários podem adicionar, editar, listar e remover tarefas de forma simples e eficiente.

## 🚀 Instalação e Configuração

### 1️⃣ Instalar o NestJS CLI
```bash
$ npm install -g @nestjs/cli
```

### 2️⃣ Clonar ou Download o Repositório
```bash
$ git clone https://github.com/chrystophermedeiros/api-todolist.git
```

Download:
```bash
$ https://github.com/chrystophermedeiros/api-todolist/archive/refs/heads/main.zip
```

```bash
$ cd api-todolist
```

### 3️⃣ Instalar as Dependências
```bash
$ npm install
```

### 4️⃣ Instalar o SQLite

- **Windows**:
### Instalação do SQLite no Windows

Para instalar o SQLite no Windows, siga os passos abaixo:

1. **Baixar o SQLite**:
   - Acesse a [página de download do SQLite](https://www.sqlite.org/download.html).
   - Baixe o arquivo ZIP na seção "Precompiled Binaries for Windows" baixe o sqlite-tools Escolha o sqlite-dll e baixe o de acordo com sua versao do windows.

2. **Extrair o Arquivo ZIP**:
   - Extraia o conteúdo dos arquivos ZIP para um diretório, como `C:\sqlite`.

3. **Adicionar ao PATH**:
   - Abra o Painel de Controle e vá em "Sistema e Segurança" > "Sistema" > "Configurações avançadas do sistema".
   - Clique em "Variáveis de Ambiente" e encontre a variável `Path` na seção "Variáveis do sistema".
   - Edite o `Path` e clique em Novo e adicione o caminho para o diretório do SQLite (por exemplo, `C:\sqlite`).

4. **Verificar a Instalação**:
   - Abra o Prompt de Comando e digite `sqlite3` para verificar se a instalação foi bem-sucedida, se tiver algo como: `SQLite version 3.49.1 2025-02-18 13:38:58` é porque deu certo.

  Agora você está pronto para usar o SQLite em seu projeto!


- **Linux**: Instale via terminal:
  ```bash
  sudo apt update && sudo apt install sqlite3
  ```
- **MacOS**: Instale via Homebrew:
  ```bash
  brew install sqlite3
  ```

### 5️⃣ Banco de Dados Pré-configurado
Já existe um banco de dados SQLite no caminho `src/db/todolist.db` contendo um usuário e uma tarefa cadastrada.

- **Usuário Padrão:**
  - **Email:** teste@gmail.com
  - **Senha:** 12345678

### 6️⃣ Configurar Variáveis de Ambiente
Renomeie o arquivo `.env.example` para `.env`:
```bash
$ mv .env.example .env
```
O arquivo já contém os valores corretos para facilitar a configuração ou se desejar pode ficar a vontade para modificar.

### 7️⃣ Rodar Aplicação
```bash
# Modo desenvolvimento
$ npm run start:dev

# Modo debug
$ npm run start:debug

# Modo de produção 
$ npm run start
```

### 8️⃣ Rodar Migrations (se necessário)
```bash
$ npm run migration:run
```

## Testes Automatizados

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 📄 Documentação (Swagger)
A API possui documentação acessível via Swagger:
[http://localhost:3001/swagger](http://localhost:3001/swagger)

## {  } JSON para importação (Insomnia)
Caso precise do JSON para importação para facilitar:
[insomina.json](https://drive.google.com/file/d/1aiKybecKou62P12s-aA6V9Vw7u1y42Nz/view?usp=sharing)


## 📚 Documentação notion

Para mais detalhes sobre a API To-Do List, consulte a documentação completa disponível no Notion:

[Documentação da API To-Do List](https://www.notion.so/To-Do-List-1a1970cffeb88074ba67ce0fe4c85fa8?pvs=4)

### Conteúdo da Documentação

A documentação inclui as seguintes seções:

- **Jornada do Usuário**: Descrição das interações do usuário com a aplicação.
- **Requisitos Funcionais (RF's)**: Detalhamento das funcionalidades que a aplicação deve oferecer.
- **Regras de Negócio (RN's)**: Regras que definem o comportamento da aplicação e suas operações.
- **Requisitos Não Funcionais (RNF's)**: Especificações que a aplicação deve atender, como desempenho e segurança.
- **Design da API**: Estrutura das rotas da API, incluindo:
  - Exemplos de requisições e respostas.
  - Orientações sobre como utilizar a aplicação de forma eficaz.

Essa documentação fornece uma visão abrangente para desenvolvedores e usuários, facilitando a compreensão e utilização da API.



## 📦 Extensões do VSCode Utilizadas

Para facilitar o desenvolvimento e garantir a qualidade do código, as seguintes extensões do Visual Studio Code foram utilizadas:

- **ESLint**: Ferramenta para identificar e corrigir problemas no código JavaScript e TypeScript, ajudando a manter a consistência e a qualidade do código.
- **Prettier**: Um formatador de código que garante que o código esteja sempre formatado de maneira consistente, independentemente de quem o escreve.

Certifique-se de instalar essas extensões para um desenvolvimento mais eficiente!


## 🛠 Tecnologias Utilizadas

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-FF5733?style=for-the-badge)
![Migrations](https://img.shields.io/badge/Migrations-563D7C?style=for-the-badge)
![Entity](https://img.shields.io/badge/Entity-1D3B8F?style=for-the-badge)
![Class-Validator](https://img.shields.io/badge/Class--Validator-EC407A?style=for-the-badge)
![Class-Transformer](https://img.shields.io/badge/Class--Transformer-7B1FA2?style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white)
![Insomnia](https://img.shields.io/badge/Insomnia-5849BE?style=for-the-badge&logo=insomnia&logoColor=white)



## 📜 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](https://github.com/chrystophermedeiros/api-todolist/blob/main/LICENSE) para mais detalhes.

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://www.linkedin.com/in/chrystopher-medeiros/" title="Linkedin">
        <img src="https://avatars.githubusercontent.com/u/91420438?v=4" width="100px;" alt="Foto do Chrystopher Medeiros no GitHub"/><br>
        <sub>
          <b>Desenvolvedor Front-End</b>
          <br>
          <b>Chrystopher Medeiros</b>
        </sub>
      </a>
    </td>
  </tr>
</table>


