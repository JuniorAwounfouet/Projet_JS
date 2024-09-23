describe('Formulaire d\'inscription', () => {
  
    // Test 1 : Charger la page d'inscription
    it('devrait charger la page d\'inscription avec le formulaire', () => {
      cy.visit('http://localhost:5173/#/contact');  
      cy.get('form').should('be.visible'); 
    });
  
    // Test 2 : Soumission réussie du formulaire
    it('devrait soumettre le formulaire avec succès', () => {
      cy.visit('http://localhost:5173/#/contact');
      
      cy.get('input[id="name"]').type('John Doe'); 
      cy.get('input[id="email"]').type('john@gmail.com');
      cy.get('textarea[id="message"]').type('welcome');
      
      cy.get('form').submit();  
      
      cy.get('.success-message').should('contain', 'Thank you for contacting us');

      cy.url().should('include', 'http://localhost:5173/#/contact');
    });
  
    // Test 3 : Validation de champ vide
    // it('devrait afficher un message d\'erreur si le champ email est vide', () => {
    //   cy.visit('http://localhost:5173/#/contact');
      
    //   cy.get('input[name="name"]').type('John Doe');
    //   cy.get('textarea[name="message"]').type('welcome');
      
    //   cy.get('form').submit(); 
      
    //   cy.get('.error-message').should('contain', 'Le champ email est requis');
    // });
  });
  