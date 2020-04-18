import gql from "graphql-tag"

import { task } from "../fragments"
export default gql`
        mutation createTask($name: String!, $start: TimeInput!, $done: TimeInput!, $daily: Boolean!) {
                createTask(CreateTaskDto: {
                        name: $name,
                        start: $start,
                        done: $done,
                        daily: $daily
                }) {
                        ...Task
                }
                ${task}
        }
`;