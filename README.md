# O que foi desenvolvido:
  A API construída é um sistema de gerenciamento de vendas no formato dropshipping onde é possível criar, visualizar, deletar e atualizar produtos e vendas. Foi utilizado o banco de dados MySQL para a gestão de dados. Além disso, a API está no formato RESTful.

# Rodando o projeto com docker:

Rode os serviços node e db com o comando
`docker-compose up -d`
<br>
A partir daqui você pode rodar o container store_manager via CLI ou abri-lo no VS Code;
<br>
Use o comando docker `exec -it store_manager bash` para rodar via CLI. Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano;
<br>
Instale as dependências com `npm install` (Instale dentro do container);
<br>
Insira o comando `npm run debug` para rodar a aplicação;
<br>
Para rodar os testes, rode o comando `npm run test:mocha`;
<br>
Para restaurar o banco de dados, rode o comando `npm run restore`;
<br>
