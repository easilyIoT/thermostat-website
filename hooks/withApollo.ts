import withApollo from "next-with-apollo"
import ApolloClient, { InMemoryCache } from "apollo-boost"

import { API_URL } from "../config"

export default withApollo(({ initialState }) => new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache().restore(initialState || {})
}));