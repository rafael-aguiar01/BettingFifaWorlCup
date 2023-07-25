Bolão da Copa
=============

Este é um projeto de Bolão da Copa, que permite realizar palpites e apostas em jogos da Copa do Mundo.

Rotas
-----

- group-routes.ts: Rota para adicionar grupos
- list-routes.ts: Rota para listar pontos
- match-routes.ts: Rota para adicionar partidas
- player-routes.ts: Rota para adicionar jogadores
- point-routes.ts: Rota para adicionar pontos
- position-routes.ts: Rota para adicionar posições
 
Tecnologias
-----------

- Node.js
- Express.js
- MongoDB
  
Dependências
------------

### Dependências de Desenvolvimento

- @shelf/jest-mongodb: ^4.1.1
- @types/jest: ^29.1.2
- @types/mongodb: ^3.3.14
- @types/node: ^18.11.0
- @typescript-eslint/eslint-plugin: ^5.0.0
- eslint: ^8.0.1
- eslint-config-standard-with-typescript: ^23.0.0
- eslint-plugin-import: ^2.25.2
- eslint-plugin-n: ^15.0.0
- eslint-plugin-promise: ^6.0.0
- git-commit-msg-linter: ^4.2.1
- husky: ^4.0.6
- jest: ^29.2.0
- lint-staged: ^13.0.3
- sucrase: ^3.28.0
- supertest: ^6.3.0
- ts-jest: ^29.0.3
- ts-node: ^10.9.1
- typescript: ^4.8.4
 
### Dependências

- express: ^4.18.2
- fast-glob: ^3.2.12
- mongodb: 3.5.1
 
Como rodar a aplicação localmente
---------------------------------

1. No terminal, clone o projeto:
 `git clone https://github.com/rafael-aguiar01/bolao-da-copa.git`3. Entre na pasta do projeto:
 `cd bolao-da-copa`5. Instale as dependências:
 `npm install`7. Execute a aplicação:
 `npm start`9. A aplicação estará acessível em http://localhost:3000
 
Contribuição
------------

Se você deseja contribuir com este projeto, sinta-se à vontade para abrir um Pull Request. Será um prazer receber suas melhorias e correções de bugs.

Licença
-------

Este projeto está licenciado sob a [Licença MIT](https://opensource.org/licenses/MIT).
