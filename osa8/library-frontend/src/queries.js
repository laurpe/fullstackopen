import { gql } from '@apollo/client'


export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
            id
        }
    }
`

export const ALL_BOOKS = gql`
    query allBooks($genre: String, $author: String) {
        allBooks (genre: $genre, author: $author) {
            title
            author {
                name
            }
            id
            published
            genres
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`

export const SET_BIRTHYEAR = gql`
    mutation setBirthyear($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
            bookCount
        }
    }
`

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username: $username,
            password: $password
        ) {
            value
        }
    }
`

export const LOGGED_USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`