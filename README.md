# Sistema de Gestão de Estoque e Caixa

Este projeto é um sistema web completo para controle de estoque, registro de vendas (frente de caixa) e gestão de usuários, construído com uma arquitetura cliente-servidor.

## Objetivo Geral

Desenvolver um sistema web para controle de estoque, registro de vendas (caixa) e gestão de usuários, com base em uma arquitetura cliente-servidor moderna, aplicando os conceitos de formulários reativos, validações, rotas protegidas, serviços REST e papéis de usuário (roles).

## Funcionalidades Principais

O sistema é dividido em módulos com permissões baseadas em dois perfis de usuário: **ADMIN** e **OPERADOR**.

### Módulos Principais

* **Autenticação:** Tela de login simples com e-mail e senha. A autenticação é feita via Basic Auth e a sessão é mantida no frontend.
* **Gestão de Usuários (ADMIN):** CRUD completo de usuários, permitindo cadastrar, listar, editar e excluir contas de administradores ou operadores.
* **Gestão de Produtos (ADMIN):** CRUD completo de produtos, definindo código, nome, categoria, preço e estoque inicial.
* **Movimentação de Estoque (ADMIN):** Permite registrar entradas, ajustes positivos ou negativos no estoque de um produto, com data, motivo e usuário responsável.
* **Caixa / PDV (OPERADOR):** Interface de Ponto de Venda para registrar vendas de múltiplos itens. O sistema calcula automaticamente o subtotal, total e troco, e realiza a baixa automática do estoque no momento da finalização da venda.
* **Relatórios (ADMIN e OPERADOR):** Listagem de todas as vendas registradas, com filtros por data, usuário e valor.

## Tecnologias Utilizadas

O projeto é dividido em duas partes principais:

### Backend (API REST)

* **Java 21**
* **Spring Boot 3**
* **Spring Data JPA:** Para persistência de dados.
* **Spring Security:** Para controle de autenticação e autorização baseada em papéis (`ADMIN`, `OPERADOR`).
* **H2 Database:** Banco de dados em arquivo para ambiente de desenvolvimento.
* **Maven:** Gerenciador de dependências.

### Frontend (Cliente Web)

* **Angular 17**
* **TypeScript**
* **PrimeNG 17:** Biblioteca de componentes de UI.
* **Angular Router:** Para gerenciamento de rotas.
* **HTTP Interceptor:** Para anexar automaticamente o token de autenticação nas requisições à API.

##  Como Executar

### Pré-requisitos

* Node.js e NPM
* JDK 21
* Maven

### 1. Executando o Backend

1.  Navegue até a pasta `BACKEND-SistemaGestaoEstoqueCaixa`.
2.  Execute o projeto usando o Maven Wrapper:
    ```bash
    # No Windows
    ./mvnw.cmd spring-boot:run
    
    # No Linux/macOS
    ./mvnw spring-boot:run
    ```
3.  A API estará disponível em `http://localhost:8080`.

### 2. Executando o Frontend

1.  Em outro terminal, navegue até a pasta `FRONTEND-SistemaGestaoEstoqueCaixa/sistema-estoque-front`.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```
4.  A aplicação estará disponível em `http://localhost:4200`.

## Entrar na aplicação

1. Acesse `http://localhost:8080/h2-console`
   
2. Preencha os dados com base no: `application.properties:`
Driver Class: `org.h2.Driver`
JDBC URL: `jdbc:h2:file:./data/db-api`
User Name: `sa`
Password: `(deixe em branco)`

3.Adicione o usuario ADMIN
`INSERT INTO usuarios (id, nome_completo, email, senha, perfil, ativo)
VALUES (1, 'Admin', 'admin@email.com', 'admin123', 'ADMIN', true);`

4. Volte na tela de login e coloque as credenciais!

4.1 **CASO JÁ EXISTA UM USUARIO COLOQUE ISSO NO H2** 
 `UPDATE usuarios SET senha = 'admin123', perfil = 'ADMIN', ativo = true WHERE id = 1;`
    e coloque novamnete as credenciais no sistema

## 👨‍💻 Desenvolvedores

* **Backend:** Rayssa
* **Frontend:** Wagner
