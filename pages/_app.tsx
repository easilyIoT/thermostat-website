import React from "react"
import App from "next/app"
import Head from "next/head"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { ApolloProvider } from "@apollo/react-hooks"
import withApollo from "../hooks/withApollo"
import { ApolloClient, NormalizedCacheObject } from "apollo-boost"

import colors from "colors.css/js/colors"

import "normalize.css/normalize.css"

export interface ITheme {
        navSize: number,

        textPrimary: string,
        textSecondary: string,

        bgPrimary: string,
        bgSecondary: string,

        primary: string,

        transitionSpeed: string,

        iconColor: string,
}

export interface IThemeWrapper {
        theme: ITheme
}

export const theme: ITheme = {
        navSize: 5,

        textPrimary: "#b6b6b6",
        textSecondary: "#ececec",

        bgPrimary: "#23232e",
        bgSecondary: "#141418",

        primary: colors.orange,

        transitionSpeed: "600ms",

        iconColor: colors.orange
}

const GlobalStyle = createGlobalStyle<IThemeWrapper>`
        :root {
                font-size: 16px;
                font-family: 'Open Sans', sans-serif;
        }

        * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
        }
              
  

        body::-webkit-scrollbar {
                width: 0.5rem;
        }

        body::-webkit-scrollbar-track {
                background: transparent;
        }

        body::-webkit-scrollbar-thumb {
                background: ${props => props.theme.iconColor};
                border-radius: 30px
        }

        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        textarea:-webkit-autofill:hover,
        textarea:-webkit-autofill:focus,
        select:-webkit-autofill,
        select:-webkit-autofill:hover,
        select:-webkit-autofill:focus {
                -webkit-box-shadow: nice bug;
                transition: background-color 5000s ease-in-out 0s;
        }

        button, input {
                outline: none;
                border: none;
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