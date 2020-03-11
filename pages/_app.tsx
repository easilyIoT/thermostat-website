import React from "react"
import App from "next/app"
import Head from "next/head"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { ApolloProvider } from "@apollo/react-hooks"
import withApollo from "../hooks/withApollo"
import { ApolloClient, NormalizedCacheObject } from "apollo-boost"

export interface ITheme {

}

export interface IThemeWrapper {

}

export const theme: ITheme = {

}

const GlobalStyle = createGlobalStyle<IThemeWrapper>`
        body {
                margin: 0;
                padding: 0;
        }
`;

export interface IProps {
        apollo: ApolloClient<NormalizedCacheObject>
}

class MyApp extends App<IProps> {

        render() {

                const { Component, pageProps, apollo } = this.props;
                return (
                        <React.Fragment>
                                <Head>
                                        <title>Easily Thermostat</title>

                                        <meta charSet='utf-8' />
                                        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                                        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                                </Head>
                                <ApolloProvider client={apollo}>
                                        <ThemeProvider theme={theme}>
                                                <GlobalStyle />
                                                <Component {...pageProps} />
                                        </ThemeProvider>
                                </ApolloProvider>
                        </React.Fragment>
                )
        }
}

export default withApollo(MyApp);