import React, { useState, FunctionComponent } from "react"
import { NextPage, NextPageContext } from 'next';

import nextCookies from 'next-cookies';

import { redirect, getUserFromToken, isValidUser } from "../../utils"

import Layout from '../../components/Layout'
import Thermostat from "../../components/Thermostat"


type Props = {

}

const Regulate: NextPage<Props> = () => {

	return (
		<Layout title="Regulate">
			<Thermostat />
		</Layout>
	)
}

Regulate.getInitialProps = async (ctx: NextPageContext) => {
	const { token } = nextCookies(ctx);

	if (!token) {
		redirect("/login", ctx);
		return {};
	}

	let user;
	if (user = await getUserFromToken(token)) {
		if (!isValidUser(user))
			redirect("/complete_registration", ctx);
	} else
		redirect("/login", ctx);

	return {
	}
}

export default Regulate;