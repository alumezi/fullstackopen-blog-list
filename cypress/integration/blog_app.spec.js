describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    cy.request('POST', 'http://localhost:3001/api/users', { username: 'alumezi', password: 'sekret', name: 'Arbnor' })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to the application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.login({ username: 'alumezi', password: 'sekret' })
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

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'alumezi', password: 'sekret' })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function () {
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

    it('can like a blog', function() {
      cy.create_blog({ title : 'make sure we have a blog', author: 'cypress', url: 'http://localhost:3000/or/whatever'  })
        .then(() => {
          cy.visit('http://localhost:3000')
        })
      cy.contains('view').click()
      cy.get('.blog-container').should('contain', 'http://localhost:3000/or/whatever')
        .and('contain', 'make sure we have a blog cypress')
        .and('contain', 'hide')
        .and('contain', 'http://localhost:3000/or/whatever')
        .and('contain', 'cypress')
      cy.get('.blog-likes-container').should('contain', 0)
      cy.get('[data-testid=like-btn]').click()
      cy.get('.blog-likes-container').should('contain', 1)
      cy.get('[data-testid=like-btn]').click()
      cy.get('.blog-likes-container').should('contain', 2)
    })

    it('remove a blog', function() {
      cy.create_blog({ title : 'make sure we have a blog', author: 'cypress', url: 'http://localhost:3000/or/whatever'  })
        .then(() => {
          cy.visit('http://localhost:3000')
        })
      cy.contains('view').click()
      cy.get('.blog-container').should('contain', 'http://localhost:3000/or/whatever')
        .and('contain', 'make sure we have a blog cypress')
        .and('contain', 'hide')
        .and('contain', 'http://localhost:3000/or/whatever')
        .and('contain', 'cypress')
      cy.contains('Remove').click()
      cy.get('.notification-message')
        .should('contain', 'Deleted make sure we have a blog by cypress')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('blog-container').should('not.exist')
    })

    it('sorts blogs', function () {
      cy.create_blog({ title: 'make sure we have a blog1', author: 'cypress1', url: 'http://localhost:3000/whatever', likes: 22 })
      cy.create_blog({ title: 'make sure we have a blog2', author: 'cypress2', url: 'http://localhost:3000/atever', likes: 10 })
      cy.create_blog({ title: 'make sure we have a blog3', author: 'cypress3', url: 'http://localhost:3000/or/wh', likes: 2 })
      cy.visit('http://localhost:3000')
      cy.get('[data-testid=view-btn]').click({ multiple: true })
      cy.get('.blog-likes-container').then(items => {
        expect([
          parseInt(items[0].children[0].innerText),
          parseInt(items[1].children[0].innerText),
          parseInt(items[2].children[0].innerText)
        ]).to.have.ordered.members([22, 10, 2]).but.not.have.ordered.members([2, 10, 22])
      })


    })
  })
})