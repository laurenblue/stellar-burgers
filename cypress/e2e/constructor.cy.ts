describe('тест космической бургерной', () => {
  const categoryBunSelector = '[data-testid=category-bun]';
  const categoryMainSelector = '[data-testid=category-main]';
  const categorySauceSelector = '[data-testid=category-sauce]';
  const modalsSelector = '[id=modals]';
  const buttonSelector = '[type=button]';

  beforeEach(() => {
    cy.viewport(3840, 2160);
    cy.visit('/');
    cy.intercept('GET', 'api/ingredients', { fixture: 'mockIngredients.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'mockOrder.json' }).as(
      'createOrder'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'mockUser.json' }).as(
      'fetchUser'
    );
    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'testRefreshToken');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  describe('Добавление ингредиентов в конструктор бургера', () => {
    it('должен добавить булки в конструктор бургера', () => {
      cy.contains('Выберите булки').should('exist');
      cy.get(categoryBunSelector).contains('Добавить').click();
      cy.wait(1000);
      cy.get('.constructor-element_pos_top')
        .contains('Флюоресцентная булка R2-D3')
        .should('exist');
    });

    it('добавить ингредиенты в конструктор бургера', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get(categoryMainSelector).contains('Добавить').click();
      cy.wait(1000);
      cy.get('.constructor-element')
        .contains('Говяжий метеорит (отбивная)')
        .should('exist');
    });

    it('добавить соусы в конструктор бургера', () => {
      cy.contains('Выберите начинку').should('exist');
      cy.get(categorySauceSelector).contains('Добавить').click();
      cy.wait(1000);
      cy.get('.constructor-element')
        .contains('Соус с шипами Антарианского плоскоходца')
        .should('exist');
    });
  });

  describe('Модальное окно ингредиента', () => {
    it('показать и закрыть детали ингредиента', () => {
      cy.get(`${categoryBunSelector} li`).first().click();
      cy.wait(1000);
      cy.get(modalsSelector)
        .contains('Флюоресцентная булка R2-D3')
        .should('be.visible');
      cy.get(modalsSelector).find('button').click().should('not.exist');
    });
  });

  describe('Обработка заказа', () => {
    it('показать залогиненного пользователя в хэдере', () => {
      cy.wait(1000);
      cy.get('header').contains('Lauren').should('exist');
    });

    it('успешно создать заказ', () => {
      cy.get(categoryBunSelector).contains('Добавить').click();
      cy.wait(1000);
      cy.get(categoryMainSelector).contains('Добавить').click();
      cy.wait(1000);
      cy.get(categorySauceSelector).contains('Добавить').click();
      cy.wait(1000);
      cy.get(buttonSelector).contains('Оформить заказ').click();
      cy.wait('@createOrder', { timeout: 4000 })
        .its('response.statusCode')
        .should('eq', 200);
      cy.get(modalsSelector).contains('123456').should('be.visible');
      cy.wait(1000);
      cy.get(modalsSelector).find('button').click().should('not.exist');
      cy.get('[id=root]')
        .should('contain', 'Выберите булки')
        .and('contain', 'Выберите начинку');
    });

    it('показать предупреждение при попытке создать заказ без ингредиентов', () => {
      cy.window().then((win) => {
        cy.stub(win, 'alert').as('alertStub');
      });
      cy.wait(1000);
      cy.get(buttonSelector).contains('Оформить заказ').click();
      cy.get('@alertStub').should('be.called');
      console.log('Alert is about to be called');
      cy.get('@alertStub').should(
        'be.calledWith',
        'Выберите булки и начинки для оформления заказа'
      );
    });
  });
});
