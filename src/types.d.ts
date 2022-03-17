export type Userts = {
    id_user?: string,
    username: string,
    email: string,
    password?: string,
    url?: string
}

export type Taskts = {
    id_task?: string,
    title: string,
    descriptio: string,
    url?: string,
    done?: boolean,
    id_user?: string
}

export type Payload = {
    sub?: string,
    exp: number,
    username: string,
    email: string
}

declare global {
    namespace Express {
        interface User {
            sub: string,
            exp: number,
            username: string,
            email: string
        }
    }
}