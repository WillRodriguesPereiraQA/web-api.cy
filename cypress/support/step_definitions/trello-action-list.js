import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { TrelloApi } from "../api_objects/TrelloApiObject";

let trelloResponse;
let trelloData;

Given("que uso a API do Trello para obter a ação {string}", (actionId) => {
  cy.fixture("trello-action").then((data) => {
    trelloData = data;
    // Garante que o ID do .feature seja usado
    trelloData.actionId = actionId || trelloData.actionId; 
  });
});

When("envio uma requisição GET para a ação Trello", () => {
  cy.then(() => {
    return new TrelloApi().getAction(trelloData.actionId).then((response) => {
      trelloResponse = response;
    });
  });
});

Then("devo receber o status code {string} e exibir o nome da lista", (expectedStatus) => {
  // Transforma o texto "200" em número para validar com sucesso
  expect(trelloResponse.status).to.eq(Number(expectedStatus)); 
  expect(trelloResponse.body.data.list).to.have.property("name");
  cy.log(`Nome da lista: ${trelloResponse.body.data.list.name}`);
  expect(trelloResponse.body.data.list.name).to.equal(trelloData.expectedListName);
});
