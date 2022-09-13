AlphaMulti
Integrantes
Anderson Ferreira Alves

     

Jaime

Tiago

Desafio
Escopo

Desenvolver um pequeno sistema bancário em typescript que contenha tanto backend (escrito em nodejs utilizando express) e frontend (escrito em reactjs). A aplicação deve permitir operações básicas como criar transferências, depósitos, saques, criação de conta e visualização do extrato da conta.

Tecnologias utilizadas

Rafa-Js Rafa-CSS Rafa-CSS Rafa-CSS Rafa-CSS Rafa-CSS Rafa-CSS Rafa-CSS Rafa-CSS Rafa-CSS

Especificações do frontend
O frontend deve ser feito em typescript com react e utilizando o vite;

A estilização deve ser feito com o Tailwind;

O roteamento de páginas deve ser feito com o react-router-dom;

A aplicação deve respeitar o modelo do figma cujo o link se encontra abaixo:

Link do figma

Especificações do backend
Utilizar TypeScript
Utilizar o pacote express e @types/express
Utilizar o pacote uuid
Utilizar variáveis de ambiente (.env)
A API deve manipular os dados e transações de uma Conta Bancária
Cada conta bancária deve possuir:
Dados do dono:
Nome
Data de nascimento
Email
CPF
ID (uuid)
Dados da Conta:
Agência
Dígito verificador da agência
Número da conta
Dígito verificador do número da conta
Saldo
ID (uuid)
Todos os dados devem possuir validação, mesmo que mínima
A API deve ser capaz de tratar exceções
Todas as requisições feitas devem possuir um padrão de resposta
