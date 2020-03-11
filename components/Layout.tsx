import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import Navbar from "./Navbar"

type Props = {
	title?: string
}

const Layout: React.FunctionComponent<Props> = ({
	children,
	title = 'This is the default title',
}) => (
		<React.Fragment>
			<Navbar />
		</React.Fragment>
	)

export default Layout
