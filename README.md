# Aplicação Web de Mensagens Seguras

##  Objetivo

Desenvolver uma aplicação web simples que permita a troca segura de mensagens entre dois usuários, utilizando **criptografia AES** (simétrica) e proteção contra **ataques CSRF**.

---

## Tecnologias Utilizadas

- Node.js
- Express.js
- Crypto (criptografia AES)
- csurf (proteção contra CSRF)
- HTML/CSS/JavaScript (front-end)
- Visual Studio Code

---

## Criptografia Implementada

### Tipo: Simétrica (AES-256-CBC)

- Utiliza a mesma chave para criptografar e descriptografar.
- A chave e IV são gerados automaticamente e usados na função de criptografia.
- A mensagem criptografada é ilegível sem a chave correta.

---

## Proteção contra CSRF

- Utiliza o middleware `csurf`.
- O servidor gera um token CSRF para cada sessão.
- O front-end injeta o token no formulário via JavaScript.
- Requisições POST sem esse token são automaticamente bloqueadas.


---

## Funcionalidades

- Envio e recebimento de mensagens com criptografia.
- Interface limpa com campo de mensagem e botão de envio.
- Mensagens exibidas de forma descriptografada para o usuário.
- Sistema protegido contra ataques CSRF.

---

## Estrutura do Projeto

AC2-CIBER/
├── node_modules/
├── public/
│   └── index.html
├── server.js
├── package.json


# QUESTÃO 2

## Criptografia Simétrica vs. Criptografia Assimétrica

### Criptografia Simétrica

Na criptografia simétrica, a mesma chave é usada para criptografar e descriptografar as mensagens.  
É rápida e eficiente, mas requer um canal seguro para o envio da chave entre as partes envolvidas.

**Exemplo prático:**  
Um aplicativo de mensagens (como o WhatsApp) usa AES (simétrica) para criptografar o conteúdo das mensagens após a troca inicial de chaves.

**Quando usar:**  
- Quando a comunicação ocorre entre partes que já compartilham uma chave com segurança.  
- Ideal para grandes volumes de dados em tempo real.
---

### Criptografia Assimétrica

Na criptografia assimétrica, utiliza-se um par de chaves:  
- Chave pública (para criptografar)  
- Chave privada (para descriptografar)

**Exemplo prático:**  
Na troca de e-mails seguros, como com PGP, o remetente usa a chave pública do destinatário para criptografar a mensagem, que só poderá ser lida com a chave privada.

**Quando usar:**  
- Em ambientes onde as partes não se conhecem previamente.  
- Para autenticação digital e transmissão segura da chave simétrica (como no protocolo **HTTPS**).

# QUESTÃO 3

## Mitigação de Ataques em Aplicações Web

Abaixo estão três ataques comuns que afetam aplicações web, juntamente com suas respectivas formas de mitigação:

---
### 1. Cross-Site Scripting (XSS)

**Descrição:**  
Ataque onde scripts maliciosos são injetados em páginas web, sendo executados no navegador de outros usuários.

**Mitigação:**  
- Escapar entradas do usuário (ex.: com `DOMPurify` no front-end ou validação no back-end).
- Sanitização de HTML para evitar inserção de `<script>`.
- Utilizar CSP (Content Security Policy) para restringir execução de scripts não autorizados.
---

### 2.  Cross-Site Request Forgery (CSRF)

**Descrição:**  
Ataque onde comandos maliciosos são enviados de um site externo em nome de um usuário autenticado.

**Mitigação:**  
- Utilizar tokens CSRF únicos em cada formulário (ex.: via middleware `csurf` no Node.js).
- Validar origem das requisições (header `Origin` ou `Referer`).
- Evitar uso de métodos inseguros (como `GET`) para ações que alteram dados.
---

### 3. Injeção de SQL (SQL Injection)

**Descrição:**  
Ataque que insere comandos SQL maliciosos em campos de entrada, podendo manipular ou acessar o banco de dados.

**Mitigação:**  
- Usar prepared statements ou ORMs.
- Validar e sanitizar entradas do usuário.
- Restringir permissões no banco (ex.: negar `DROP` a usuários comuns).



