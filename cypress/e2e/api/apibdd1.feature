# language: pt
@api
Funcionalidade: Criar Usuário via API

  Cenário: Deve criar um novo usuário com sucesso
    Dado que eu preparei os dados do novo usuário
    Quando eu enviar uma requisição POST para a rota de cadastro
    Então o status code da resposta deve ser 201
    E o corpo da resposta deve conter o nome do usuário criado
