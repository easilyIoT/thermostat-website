

export interface User {
        id: string;

        email: string;
        passowrd: string;

        access_token: string;
        refresh_token: string;
}

export interface Task {
        id: string,

        name: string,

        owner: string,

        start: number,
        done: number
}

export interface Device {
        _id: string,

        owner: string,

        name: string,
        type: string,

        actions: string[],
        reads: string[],
        categories: string[],

        state: string,

        isOnline: string
}

export interface Group {
        _id: string,

        owner: string,

        name: string,
        description: string,

        devices: Device[],
        categories: string[]
}

export interface Task {
        id: string,

        name: string,
        owner: string,

}
