import { Time } from "../graphql/types"


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


