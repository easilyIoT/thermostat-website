import React from "react"
import { NextPage, NextPageContext } from 'next';
import nextCookies from 'next-cookies';

import { redirect, getUserFromToken, isValidUser } from "../../utils"
import { User } from "../../interfaces/api"
import Layout from '../../components/Layout'


type Props = {
}

const Tasks: NextPage<Props> = ({ }) => {
	return (
		<Layout title="Tasks">
			<div>Ciao</div>
		</Layout>
	)
}


Tasks.getInitialProps = async (ctx: NextPageContext) => {
	const { token } = nextCookies(ctx);

	if (!token) {
		redirect("/login", ctx);
		return {};
	}

	let user;
	if (user = await getUserFromToken(token)) {
		if (!isValidUser(user))
			redirect("/complete_registration", ctx);
	}
	else
		redirect("/login", ctx);

	return {
	}
};


export default Tasks;