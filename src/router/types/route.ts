import { Router as ExpressRouter } from 'express'

export enum methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

interface obj {
    [key: string]: unknown
}

export interface Endpoint {
    title: string
    path: string
    method: methods
    body?: obj
    headers?: obj
    description?: string
    response?: obj
}

export interface Endpoints {
    title: string
    prefix: string
    endpoints: Endpoint[]
}

export interface RouterController {
    readonly endpoints?: Endpoints
    getEndpoints?(): Endpoints
    getRouter(): ExpressRouter
}
