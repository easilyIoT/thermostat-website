import gql from "graphql-tag"

import { user } from "../fragments"

export default gql`
        query Me {
                me {
                        ...User
                }
        }

        ${user}
`;