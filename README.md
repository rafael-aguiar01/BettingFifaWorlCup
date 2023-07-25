<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Bolão da Copa</title>
</head>

<body>

    <h1>Bolão da Copa</h1>
    <p>Este é um projeto de Bolão da Copa, que permite realizar palpites e apostas em jogos da Copa do Mundo.</p>

    <h2>Rotas</h2>
    <ul>
        <li>group-routes.ts: Rota para adicionar grupos</li>
        <li>list-routes.ts: Rota para listar pontos</li>
        <li>match-routes.ts: Rota para adicionar partidas</li>
        <li>player-routes.ts: Rota para adicionar jogadores</li>
        <li>point-routes.ts: Rota para adicionar pontos</li>
        <li>position-routes.ts: Rota para adicionar posições</li>
    </ul>

    <h2>Tecnologias</h2>
    <ul>
        <li>Node.js</li>
        <li>Express.js</li>
        <li>MongoDB</li>
        <!-- Adicione outras tecnologias utilizadas no projeto -->
    </ul>

    <h2>Dependências</h2>
    <h3>Dependências de Desenvolvimento</h3>
    <ul>
        <li>@shelf/jest-mongodb: ^4.1.1</li>
        <li>@types/jest: ^29.1.2</li>
        <li>@types/mongodb: ^3.3.14</li>
        <li>@types/node: ^18.11.0</li>
        <li>@typescript-eslint/eslint-plugin: ^5.0.0</li>
        <li>eslint: ^8.0.1</li>
        <li>eslint-config-standard-with-typescript: ^23.0.0</li>
        <li>eslint-plugin-import: ^2.25.2</li>
        <li>eslint-plugin-n: ^15.0.0</li>
        <li>eslint-plugin-promise: ^6.0.0</li>
        <li>git-commit-msg-linter: ^4.2.1</li>
        <li>husky: ^4.0.6</li>
        <li>jest: ^29.2.0</li>
        <li>lint-staged: ^13.0.3</li>
        <li>sucrase: ^3.28.0</li>
        <li>supertest: ^6.3.0</li>
        <li>ts-jest: ^29.0.3</li>
        <li>ts-node: ^10.9.1</li>
        <li>typescript: ^4.8.4</li>
    </ul>

    <h3>Dependências</h3>
    <ul>
        <li>express: ^4.18.2</li>
        <li>fast-glob: ^3.2.12</li>
        <li>mongodb: 3.5.1</li>
    </ul>

    <h2>Como rodar a aplicação localmente</h2>
    <ol>
        <li>No terminal, clone o projeto:</li>
        <code>git clone https://github.com/rafael-aguiar01/bolao-da-copa.git</code>
        <li>Entre na pasta do projeto:</li>
        <code>cd bolao-da-copa</code>
        <li>Instale as dependências:</li>
        <code>npm install</code>
        <li>Execute a aplicação:</li>
        <code>npm start</code>
        <li>A aplicação estará acessível em http://localhost:3000</li>
    </ol>

    <h2>Contribuição</h2>
    <p>Se você deseja contribuir com este projeto, sinta-se à vontade para abrir um Pull Request. Será um prazer receber
        suas melhorias e correções de bugs.</p>

    <h2>Licença</h2>
    <p>Este projeto está licenciado sob a <a href="https://opensource.org/licenses/MIT" target="_blank">Licença MIT</a>.</p>

    <hr>
    <p>Agradecemos seu interesse no projeto Bolão da Copa! Caso tenha alguma dúvida ou sugestão, não hesite em entrar em
        contato. Esperamos que esta aplicação seja útil e traga diversão para acompanhar os jogos da Copa do Mundo!</p>

</body>

</html>
