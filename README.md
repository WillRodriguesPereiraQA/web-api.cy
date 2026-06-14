# 🚀 Automação Web e API com Cypress + BDD

Este projeto automatiza testes **web** e **API** usando **Cypress**.

A solução traz:

- cenários web em **`.feature`** no **`cypress/e2e/web/`** (BDD/Cucumber)
- testes de API como specs Cypress diretas em **`cypress/e2e/api/*.cy.js`**
- Page Object (POM) em **`cypress/support/pages/AutomationExercisePage.js`**
- API object em **`cypress/support/api_objects/TrelloApiObject.js`**
- configuração de **Cypress + esbuild** em **`cypress.config.js`**
- workflow do **GitHub Actions** para rodar os testes, gerar o relatório e publicar no Pages.

---

## 🎯 Escopo dos testes

### Web — Automation Exercise

- **URL:** https://www.automationexercise.com/
- **Objetivo:** validar cadastro de usuário, busca de produtos, adição ao carrinho e checkout.

### API — Trello

- **URL base:** https://api.trello.com/1
- **Objetivo:** consultar uma ação Trello e validar o `list.name` retornado.

---

## 📂 Estrutura do projeto

### Arquivos principais

- cenário BDD em português para o fluxo completo do site Automation Exercise.
- cenário BDD para consulta à API Trello e validação do `list.name`.
- Page Object com locators e métodos reutilizáveis para a aplicação web.
- API object para enviar requisições Trello.
- fixture com dados de teste para o fluxo Trello.
- configura o Cypress para rodar `.feature` e registrar o Cucumber preprocessor.

---

## 🧩 Como funciona a integração BDD

1. O arquivo **`.feature`** descreve o cenário de forma legível.
2. Os arquivos em **`cypress/support/step_definitions/`** mapeiam cada passo para código Cypress:
   - **`TrelloSteps.js`** — passos API
3. O API object encapsula as requisições em **`cypress/support/api - objects/TrelloApiObject.js`**.

---

## ⚙️ Como executar

### Instalar dependências

```bash
npm install
```

### Executar o cenário BDD web

```bash
npx cypress run --spec "cypress/e2e/web/AutomationExercise.cy.feature"
```

### Executar o teste API (spec Cypress)

```bash
npx cypress run --spec "cypress/e2e/api/trello-action-list.cy.js"
```

### Executar web e API juntos e Gerar Relatórios

```bash
npm run test:all
```

### Ver o resultado

O relatório será criado na pasta `cypress/reports/dashboard`. Basta abrir o arquivo **`index.html`**

---

## 🧹 Qualidade do código

```bash
npm run lint        # verifica erros

```

---

## 🔧 Configurar URLs (web / api)

- Para separar os testes, o projeto usa duas variáveis de ambiente simples:
  - `WEB_BASE_URL` — URL da aplicação web (padrão: https://www.automationexercise.com/)
  - `API_BASE_URL` — URL base da API (padrão: https://api.trello.com/1)

    ```

    ```

## ✅ Status atual

- [x] BDD/Cucumber configurado para os cenários web em `.feature`
- [x] Tests de API convertidos para specs Cypress diretas em `cypress/e2e/api/`
- [x] Page Object criado para o site Automation Exercise
- [x] API object criado para consulta a Trello
- [x] Fixture criado para o teste Trello
- [x] Execução de teste web com sucesso em `AutomationExercise.feature`
- [x] Execução de teste API com sucesso em `trello-action-list.cy.js`

### Evidências
