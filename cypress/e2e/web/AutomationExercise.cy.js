import { AutomationExercisePage } from "../../pages/AutomationExercisePage";

const page = new AutomationExercisePage();
const randomSearchTerms = ["Dress", "Tshirt", "Top", "Men", "Jeans", "Shirt"];

describe("Automation Exercise - Cadastro e compra de produtos", () => {
  it("Deve criar usuário, buscar produtos, adicionar ao carrinho e validar checkout", () => {
    // Dado que acesso o site
    page.visitHome();
    cy.get("body").should("be.visible");

    // E crio um novo usuário com dados randômicos
    const timestamp = Date.now();
    const randomName = `TesteUsuario${timestamp}`;
    const randomEmail = `teste${timestamp}@mailinator.com`;
    const randomPassword = `Senha@${timestamp}`;

    page.getSignupLoginLink().click({ force: true });
    cy.get("input[data-qa='signup-name']", { timeout: 15000 }).should("be.visible");
    page.getSignupNameInput().type(randomName);
    page.getSignupEmailInput().type(randomEmail);
    page.getSignupButton().click();

    cy.get("#id_gender1", { timeout: 15000 }).should("be.visible");
    page.getSignupTitleMrRadio().check({ force: true });
    page.getSignupPasswordInput().type(randomPassword);
    page.getSignupDaysSelect().select("1");
    page.getSignupMonthsSelect().select("January");
    page.getSignupYearsSelect().select("2000");
    page.getSignupFirstNameInput().type(randomName);
    page.getSignupLastNameInput().type("Automacao");
    page.getSignupAddress1Input().type("Rua Exemplo, 123");
    page.getSignupCityInput().type("Sao Paulo");
    page.getSignupStateInput().type("Sao Paulo");
    page.getSignupPostalCodeInput().type("01000-000");
    page.getSignupMobileNumberInput().type("11999999999");
    page.getCreateAccountButton().click();

    cy.contains("Account Created!", { timeout: 15000 }).should("be.visible");
    page.getSignupContinueButton().click({ force: true });

    // Quando entro na aba Products
    cy.wait(2000);
    page.getProductsTab().click({ force: true });
    cy.get(".features_items", { timeout: 15000 }).should("be.visible");

    // E realizo uma busca randômica por produtos
    const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];
    page.getSearchInput().clear().type(randomTerm);
    page.getSearchButton().click();
    cy.log(`Busca realizada com termo: ${randomTerm}`);
    cy.wait(2000);

    // E seleciono e adiciono 3 produtos diferentes ao carrinho
    page.getProductCards().should("have.length.at.least", 3, { timeout: 15000 }).then((cards) => {
      Cypress._.times(3, (index) => {
        cy.wrap(cards)
          .eq(index)
          .find(".product-overlay .add-to-cart")
          .click({ force: true });

        cy.contains(/Continue Shopping|Continue shopping|Continue/, { timeout: 15000 })
          .should("be.visible")
          .click({ force: true });

        cy.wait(1000);
      });
    });

    // Então devo ver os 3 produtos incluídos no carrinho na tela de pagamento
    page.getViewCartButton().click({ force: true });
    cy.url({ timeout: 15000 }).should("include", "/view_cart");
    page.getCartProducts().should("have.length", 3, { timeout: 15000 });
    page.getProceedToCheckoutButton().click({ force: true });
    cy.url({ timeout: 15000 }).should("include", "/checkout");
    page.getCartProducts().should("have.length", 3, { timeout: 15000 });
  });
});

