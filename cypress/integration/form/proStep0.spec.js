context('Form | introduction step', () => {

    const sizes = [
        {
            device: 'iphone-5',
            width: 320
        },
        {
            device: 'ipad-2',
            width: 768
        },
        {
            device: 'macbook-13',
            width: 1280
        }
    ];


    it('should show introduction step on form page', () => {
        sizes.forEach(size => {
            cy.viewport(size.device);
            cy.window().then(win=> {
                win.sessionStorage.clear();
                win.sessionStorage.setItem('current-step', 0);
                cy.login('email@paris2024.org');

                cy.visit('/form');

                cy.url().should('include', '/form').then(() => {
                    cy.takeSnapshots('form - introduction', size);
                });
            });
        })
    });

    it('should submit form', () => {
        cy.window().then(win=> {
            win.sessionStorage.clear();
            win.sessionStorage.setItem('current-step', 0);
            cy.login('email@paris2024.org');
            cy.visit('/form');
            win.sessionStorage.clear();

            cy.get('#intro_question1').clear().type('15');
            cy.get('#intro_question2').clear().type('16');
            cy.get('#intro_question3').clear().type('17');
            cy.get('button span:contains(suite)').click();

            cy.wait(1000);
            cy.get('.footer-navigation-left span').contains('introduction').should('exist');
            cy.get('.footer-navigation-right span').contains('Empreinte numérique').should('exist');
            cy.get('.footer-buttons-left button').click();
            cy.get('#intro_question1').should('have.attr', 'value', '15');
            cy.get('#intro_question2').should('have.attr', 'value', '16');
            cy.get('#intro_question3').should('have.attr', 'value', '17');
        });
    });

    it('should not submit form when questions are not filled', () => {
        sizes.forEach(size => {
            cy.viewport(size.device);
            cy.window().then(win=> {
                win.sessionStorage.clear();
                win.sessionStorage.setItem('current-step', 0);
                cy.login('email@paris2024.org');
                cy.visit('/form');

                cy.get('button span:contains(suite)').click();

                cy.get('.ant-form-item-explain div:contains("⚠ Merci de saisir votre réponse")').should(($el) => {
                    expect($el).to.have.length(3);
                }).then(() => {
                    cy.takeSnapshots('form - introduction errors', size);
                });
            });
        });
    });
});