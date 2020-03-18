import React, { useState, useEffect } from "react"
import { NextPage, NextPageContext } from 'next';
import nextCookies from 'next-cookies';
import { orange, white } from "colors.css/js/colors"
import axios from "axios"

import { redirect, getUserFromToken, isValidUser } from "../../utils"
import { hexToRgb } from "../../utils/colors"
import useUser from "../../hooks/useUser"

import Layout from '../../components/Layout'
import Bg from "../../components/Bg"
import P from "../../components/P"
import Text from "../../components/Text"
import Flex from "../../components/Flex"
import M from "../../components/M"
import Card from "../../components/Card"
import Hidden from "../../components/Hidden";
import Select from "../../components/Select"

import { Device, Group, User } from "../../interfaces/api"
import { OAUTH_API_URL, API_URL } from "../../config";
import cookies from 'react-cookies';

type Props = {

}

const Settings: NextPage<Props> = () => {
	const [user, reFetchUser] = useUser();
	const [groups, setGroups] = useState<Group[]>();
	const token = cookies.load("token");

	useEffect(() => {
		if (user && !groups)
			fetchGroups();
	}, [groups, user]);

	const fetchGroups = async () => {
		try {
			const { data } = await axios.get<{ groups: Group[] }>(`${OAUTH_API_URL}/api/group`, {
				headers: { Authorization: (user as User).access_token },

			});
			console.log(data);
			setGroups(data.groups);
		} catch (e) {
			console.log(e.response);
			if (e.response && e.response.data.status === 401)
				try {
					await axios.post(`${API_URL}/auth/regenToken`, {}, {
						headers: { Authorization: token }
					});

					reFetchUser();
				} catch (e) {
					console.error(e.response);
				}
		}
	}


	return (
		<Layout title="Settings">
			<Bg rgb={hexToRgb(orange)}>
				<P all="3em">

					<Flex align={"center"} justify={"center"} direction={"row"} rowToCol={700} >
						<M right="3em"><Card >
							<M bottom="1em">
								<Text fontSize="1.5em" fontWeight={600}>
									Groups
								</Text>
							</M>
							<Text fontSize="1em">
								<Select>
									<option>nigga</option>
									<option>nigga</option>
									<option>nigga</option>
									<option>nigga</option>
								</Select>
							</Text>
						</Card>
						</M>
						<M left="3em">
							<Card>
								<M bottom="2em">
									<Text fontSize="1.5em" fontWeight={600}>
										User
									</Text>
								</M>
								<Flex align="flex-start" justify="flex-start" direction="column">
									<Text>
										<Flex align="center" justify="center" direction="row">
											<span>email: </span>{user ? user.email : "loading..."}
										</Flex>
									</Text>

									<Text>
										<Flex align="center" justify="space-between" direction="row">
											<span>access_token: </span>{user ? <Hidden>{user.access_token}</Hidden> : "loading..."}
										</Flex>
									</Text>
								</Flex>
							</Card>
						</M>
					</Flex>
				</P>
			</Bg>
		</Layout>
	)
}


Settings.getInitialProps = async (ctx: NextPageContext) => {
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
};

export default Settings;