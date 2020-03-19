import React, { useState, useEffect } from "react"
import { NextPage, NextPageContext } from 'next';
import nextCookies from 'next-cookies';
import { orange, white } from "colors.css/js/colors"
import axios from "axios"
import styled from 'styled-components';
import cookies from 'react-cookies';
import { useFormik } from "formik"

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

type ResponsiveProps = {
	toBreak: number,
	newValue: string | number,
	newKey: string
}


const ResponsiveM = styled(M)<ResponsiveProps>`
	@media screen and (max-width: ${props => props.toBreak}px) {
		${props => props.newKey}: ${props => props.newValue};
	}
`;

const ResponsiveP = styled(P)<ResponsiveProps>`
	@media screen and (max-width: ${props => props.toBreak}px) {
		${props => props.newKey}: ${props => props.newValue};
	}
`;

const SaveGroupButton = styled.button`
	display: block;

	width: 100%;

	background-color: black;
	color: white;

	border-radius: 10px;
	padding: 1em;

	font-weight: 700;

	margin-bottom: 1em;
`;


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
				<ResponsiveP all="3em" toBreak={600} newKey="padding" newValue="1em">

					<Flex align={"center"} justify={"center"} direction={"row"} rowToCol={1100} >
						<ResponsiveM key="1" right="3em" toBreak={1100} newKey="margin" newValue="0 0 2em 0">
							<Card w h>
								<M bottom="1em">
									<Text fontSize="1.5em" fontWeight={600}>
										Groups
								</Text>
								</M>
								<M bottom="2em">
								<Text fontSize="1em">
									<Select name="group">
										{
											groups
												? groups.map((group, i) => (
													<option key={group._id}>{group.name}</option>
												))
												: <option>Loading...</option>
										}
									</Select>
									</Text>
								</M>
									<SaveGroupButton style={{ float: "right" }}>Save </SaveGroupButton>

							</Card>
						</ResponsiveM>
						<ResponsiveM key="2" left="3em" toBreak={1100} newKey="margin" newValue="0 0 2em 0">
							<Card w h>
								<M bottom="2em">
									<Text fontSize="1.5em" fontWeight={600}>
										User
									</Text>
								</M>
								<Flex align="flex-start" justify="flex-start" direction="column">
									<M bottom="1em">
										<Text>
											<Flex align="center" justify="space-between" direction="row" rowToCol={400}>
												<span>email: </span>{user ? user.email : "loading..."}
											</Flex>
										</Text>
									</M>

									<Text>
										<Flex align="center" justify="space-between" direction="row" rowToCol={400}>
											<span>token: </span>{user ? <Hidden hidden >{user.access_token}</Hidden> : "loading..."}
										</Flex>
									</Text>
								</Flex>
							</Card>
						</ResponsiveM>
					</Flex>
				</ResponsiveP>
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