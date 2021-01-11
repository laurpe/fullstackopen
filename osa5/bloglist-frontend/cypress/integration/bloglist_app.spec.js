


describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Testi Testaaja',
            username: 'testeri',
            password: 'salasana'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        const secondUser = {
            name: 'Toinen User',
            username: 'toinen',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users', secondUser)
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
            cy.login({ username: 'testeri', password: 'salasana' })
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

        describe('and multiple blogs exist', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'ekablogi', author: 'ekakirjoittaja', url: 'www.ekablogi.fi' })
                cy.createBlog({ title: 'tokablogi', author: 'tokakirjoittaja', url: 'www.tokablogi.fi' })
                cy.createBlog({ title: 'kolmasblogi', author: 'kolmaskirjoittaja', url: 'www.kolmasblogi.fi' })
            })

            it('A blog can be liked', function() {
                cy.contains('tokablogi').contains('view').click()
                cy.contains('tokablogi').contains('like').click()
            })

            it('A blog can be removed by its creator', function() {
                cy.contains('ekablogi').contains('view').click()
                cy.contains('ekablogi').contains('remove').click()

                cy.get('.blogs').should('not.contain', 'ekablogi')
            })

            it('A blog can only be removed by the user that added it', function() {
                cy.contains('logout').click()
                cy.login({ username: 'toinen', password: 'salainen' })
                cy.contains('tokablogi').contains('view').click()

                cy.get('.blogs').should('not.contain', 'remove')
            })
        })
    })
})