import Document, { Head, NextScript, Main, DocumentInitialProps, DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components"
import { ReactElement } from "react";
import { CSSProp } from "styled-components"



type Props = {
        styleTags: ReactElement<{}>[]
}
interface InitialProps extends DocumentInitialProps {
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

        render = () => {
                return (
                        <html>
                                <Head>
                                        {this.props.styleTags}
                                        <script src="https://kit.fontawesome.com/3b2e248047.js" crossOrigin="anonymous"></script>
                                        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800&display=swap" rel="stylesheet"></link>
                                </Head>
                                <body>
                                        <Main />
                                        <NextScript />
                                </body>
                        </html>
                )
        }
}


declare module "react" {
        interface Attributes {
                css?: any;
        }
}