import React from 'react'
import { NextPage, NextPageContext } from 'next';
import nextCookies from 'next-cookies';

import { redirect, getUserFromToken, isValidUser } from "../../utils"


const Dashboard: NextPage = () => (<React.Fragment />);


Dashboard.getInitialProps = async (ctx: NextPageContext) => {
	const { token } = nextCookies(ctx);

	if (!token)
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


export default Dashboard;
