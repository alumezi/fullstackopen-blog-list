describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    cy.request('POST', 'http://localhost:3001/api/users', { username : 'alumezi', password: 'sekret', name: 'Arbnor' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to the application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username : 'alumezi', password: 'sekret' })
      cy.visit('http://localhost:3000')
      cy.contains('Arbnor logged in')
    })

    it('fails with wrong credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('trying')
      cy.get('#password').type('togetin')
      cy.contains('login').click()
      cy.get('html').should('not.contain', 'Arbnor logged in')
      cy.get('.notification-message')
        .should('contain', 'Request failed with status code 404')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username : 'alumezi', password: 'sekret' })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('.blog-create-form')
      cy.get('#title').type('test title from cypress')
      cy.get('#author').type('cypress')
      cy.get('#url').type('http://localhost:3000/or/whatever')
      cy.get('#blog-create-submit').click()
      cy.get('.notification-message')
        .should('contain', 'A new blog test title from cypress by cypress added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('test title from cypress cypress view')
    })
  })
})