<h1 align="center">AlphaMulti</h1>

<h2 align="center">Integrantes</h2>

---

- Anderson Ferreira Alves

    <a href="" target="_blank"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" target="_blank"></a>
    <a href="" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
 	  <a href="" target="_blank"><img src="https://img.shields.io/badge/Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white" target="_blank"></a>
    <a href="" target="_blank"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" target="_blank"></a>
    <a href = ""><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
    <a href="" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>


- Jaime



- Tiago


---
<h2 align="center">Desafio</h2>

---

Escopo

Desenvolver um pequeno sistema bancário em typescript que contenha tanto backend (escrito em nodejs utilizando express) e frontend (escrito em reactjs). A aplicação deve permitir operações básicas como criar transferências, depósitos, saques, criação de conta e visualização do extrato da conta.

---
<h2 align="center">Tecnologias utilizadas</h2>

---

<div style="display: inline_block"><br>
  <img align="center" alt="Rafa-Js" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="Rafa-CSS" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg">
  <img align="center" alt="Rafa-CSS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" />
  <img align="center" alt="Rafa-CSS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" />
  <img align="center" alt="Rafa-CSS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" />
  <img align="center" alt="Rafa-CSS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" />
  <img align="center" alt="Rafa-CSS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" />
  <img align="center" alt="Rafa-CSS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" />
  <img align="center" alt="Rafa-CSS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" />
  <img align="center" alt="Rafa-CSS" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original-wordmark.svg" />
</div>

<br/>

---
<h2 align="center">Especificações do frontend</h2>

---

- O frontend deve ser feito em typescript com react e utilizando o vite;

- A estilização deve ser feito com o Tailwind;
- O roteamento de páginas  deve ser feito com o react-router-dom;
- A aplicação deve respeitar o modelo do figma cujo o link se encontra abaixo:

  [Link do figma](https://www.figma.com/file/2Ll2FtXbzRcW2TsZbcTzZp/Bunker?node-id=4%3A15)

---
<h2 align="center">Especificações do backend</h2>

---

- Utilizar TypeScript
- Utilizar o pacote express e @types/express
- Utilizar o pacote uuid
- Utilizar variáveis de ambiente (.env)
- A API deve manipular os dados e transações de uma Conta Bancária
- Cada conta bancária deve possuir:
  1. Dados do dono:
      - Nome
      - Data de nascimento
      - Email
      - CPF
      - ID (uuid)
  2. Dados da Conta:
      - Agência
      - Dígito verificador da agência
      - Número da conta
      - Dígito verificador do número da conta
      - Saldo
      - ID (uuid)
- Todos os dados devem possuir validação, mesmo que mínima
- A API deve ser capaz de tratar exceções
- Todas as requisições feitas devem possuir um padrão de resposta