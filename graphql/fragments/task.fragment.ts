import gql from 'graphql-tag';


export default gql`
        fragment Task on Task {
                id
                name
                start {
                        hour
                        minute
                }
                done {
                        hour
                        minute
                }
                owner
                daily
        }
`;