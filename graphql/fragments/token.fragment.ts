import gql from 'graphql-tag';

export default gql`
        fragment Token on TokenResponse {
                token
        }
`;