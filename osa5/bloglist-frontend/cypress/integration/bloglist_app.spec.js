describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Testi Testaaja',
            username: 'testeri',
            password: 'salasana'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('testeri')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
            cy.contains('Testi Testaaja')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('testeri')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.get('.error').contains('wrong username or password')
            cy.get('.error').should('have.css', 'background-color', 'rgb(206, 57, 77)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('testeri')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('testiblogi')
            cy.get('#author').type('Testi Testaaja')
            cy.get('#url').type('www.testiblogi.fi')
            cy.contains('add blog').click()

            cy.get('.notification').contains('a new blog testiblogi by Testi Testaaja added')
            cy.get('.notification').should('have.css', 'background-color', 'rgb(129, 206, 57)')
            cy.get('.bloglist').contains('testiblogi by Testi Testaaja')
        })
    })
})