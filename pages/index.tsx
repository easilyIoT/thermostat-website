import * as React from 'react'
import { NextPage, NextPageContext } from 'next'
import nextCookies from 'next-cookies';

import { redirect, isValidUser, getUserFromToken } from "../utils"

const IndexPage: NextPage = () => {
	return (
		<div>Index</div>
	)
}

IndexPage.getInitialProps = async (ctx: NextPageContext) => {
	const { token } = nextCookies(ctx);

	if(!token)
		return redirect("/login", ctx);

	let user;
	if (user = await getUserFromToken(token))
		if (isValidUser(user))
			return redirect("/dashboard/regulate", ctx);
		else
			return redirect("/complete_registration", ctx);

	else
		return redirect("/login", ctx);
}

export default IndexPage
