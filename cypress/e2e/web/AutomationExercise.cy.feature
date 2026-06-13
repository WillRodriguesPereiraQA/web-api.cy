# language: pt
@web
Funcionalidade: Cadastro e compra de produtos com validação de carrinho

  Cenário: Criar usuário com dados randômicos, buscar produtos e validar itens no checkout
    Dado que acesso o site "https://www.automationexercise.com/"
    E crio um novo usuário com dados randômicos
    Quando entro na aba "Products"
    E realizo uma busca randômica por produtos
    E seleciono e adiciono 3 produtos diferentes ao carrinho
    Então devo ver os 3 produtos incluídos no carrinho na tela de pagamento
