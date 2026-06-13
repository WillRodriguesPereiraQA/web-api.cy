import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let payload;
let apiResponse;

Given("que eu preparei os dados do novo usuário", () => {
  cy.fixture("criar-usuario").then((dados) => {
    payload = dados;
  });
});

When("eu enviar uma requisição POST para a rota de cadastro", () => {
  cy.request({
    method: 'POST',
    url: 'https://reqres.in', // URL de exemplo
    body: payload
  }).then((res) => {
    apiResponse = res;
  });
});

Then("o status code da resposta deve ser 201", () => {
  expect(apiResponse.status).to.eq(201);
});

Then("o corpo da resposta deve conter o nome do usuário criado", () => {
  expect(apiResponse.body.name).to.eq(payload.name);
});
