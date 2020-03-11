import Document, { Head, NextScript, Main, DocumentInitialProps, DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components"
import { ReactElement } from "react";


export interface Props {
        styleTags: ReactElement<{}>[]
}
export interface InitialProps extends DocumentInitialProps {
        styleTags: ReactElement<{}>[]
}

export default class MyDocument extends Document<Props> {
        static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
                
                const sheet = new ServerStyleSheet();
                const originalRenderPage = ctx.renderPage;

                try {
                        ctx.renderPage = () => originalRenderPage({
                                enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
                        });

                        const initialProps = await Document.getInitialProps(ctx);

                        return {
                                ...initialProps,
                                styles: (
                                        <>
                                                {initialProps.styles}
                                                {sheet.getStyleElement()}
                                        </>
                                )
                        }
                } finally {
                        sheet.seal();
                }
        }

        render = () => (
                <html>
                        <Head>
                                <title>Easily Thermostat</title>
                                {this.props.styleTags}
                        </Head>
                        <body>
                                <Main />
                                <NextScript />
                        </body>
                </html>
        )
}