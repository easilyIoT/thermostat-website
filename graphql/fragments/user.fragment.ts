import gql from 'graphql-tag';

export default gql`
        fragment User on User {
                id,
                email,
                access_token,
                group,
                password
        }
`;