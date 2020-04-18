import withApollo from "next-with-apollo"
import ApolloClient, { InMemoryCache } from "apollo-boost"
import { setContext } from "apollo-link-context"
import cookies from "react-cookies"
import { API_URL } from "../config"



export default withApollo(({ initialState }) => new ApolloClient({
        uri: API_URL + "/graphql",
        cache: new InMemoryCache().restore(initialState || {}),
        request: (operation) => {
                const token = cookies.load("token");

                operation.setContext({
                        headers: {
                                authorization: token
                        }
                })
        }
}));