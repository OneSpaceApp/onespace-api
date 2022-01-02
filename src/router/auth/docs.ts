import { Endpoints, methods } from '../types/route'

export const docs: Endpoints = {
    title: 'Auth',
    prefix: '/auth',
    endpoints: [
        {
            title: 'Sign Up',
            path: '/signup',
            method: methods.POST,
            description:
                'Sign Up a new user, and return a JWT with the user data and the email verification code',
            body: {
                email: 'string',
                password: 'string',
                name: 'string',
                surname: 'string',
                username: 'string',
                birthdate: 'string',
            },
            response: {
                token: 'string',
                status: 'string',
            },
        }, // Sign Up
        {
            title: 'Confirm',
            path: '/confirm',
            method: methods.POST,
            description:
                'Confirm the user email, and return a JWT with the user data',
            body: {
                token: 'JWT',
                code: 'string',
            },
            response: {
                token: 'string',
                status: 'string',
            },
        }, // Confirm
        {
            title: 'Login',
            path: '/login',
            method: methods.POST,
            description:
                'Login a user, and return a JWT with the user data',
            body: {
                email: 'string',
                password: 'string',
            },
            response: {
                token: 'string',
                status: 'string',
            },
        }, // Login
    ],
}
