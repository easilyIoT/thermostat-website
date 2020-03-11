import * as React from 'react'
import Head from 'next/head'
import styled from "styled-components"

import Navbar from "./Navbar"

type Props = {
	title?: string
}

const Main = styled.main`
	margin-left: ${props => props.theme.navSize}rem;
	padding: 1rem;
	
	height: 100vh;

	@media screen and (max-width: 600px) {
		margin-left: 0;	
	}

`;


const Layout: React.FunctionComponent<Props> = ({
	children,
	title = 'Thermostat',
}) => (
		<React.Fragment>
			<Head>
				<title>{`${title} | Easily Thermostat`}</title>
			</Head>
			<Navbar />
			<Main>
				{children}
			</Main>
		</React.Fragment>
	)

export default Layout
