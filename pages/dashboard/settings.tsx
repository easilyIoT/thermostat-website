import React, { useState, useEffect } from "react"
import { NextPage, NextPageContext } from 'next';
import nextCookies from 'next-cookies';
import { orange, white } from "colors.css/js/colors"
import axios from "axios"
import styled from 'styled-components';
import cookies from 'react-cookies';
import { useFormik, Form, Field, FormikHelpers, FormikProps } from 'formik';

import { redirect, getUserFromToken, isValidUser } from "../../utils"
import { hexToRgb } from "../../utils/styles"
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

import { Group, User } from "../../interfaces/api"
import { OAUTH_API_URL, API_URL } from "../../config";

type ResponsiveProps = {
	toBreak: number,
	newValue: string | number,
	newKey: string
}


const ResponsiveM = styled(M) <ResponsiveProps>`
	@media screen and (max-width: ${props => props.toBreak}px) {
		${props => props.newKey}: ${props => props.newValue};
	}
`;

const ResponsiveP = styled(P) <ResponsiveProps>`
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
	
	transform: scale(1);
	
	transition: transform ease-in-out 0.1s;
	&:hover {
		transform: scale(1.05);
	}
	
	&:active {
		transform: scale(1);
	}
`;

type SelectGroupForm = {
	group: string
}

type Props = {

}

const Settings: NextPage<Props> = () => {
	const [user, reFetchUser] = useUser();
	const [groups, setGroups] = useState<Group[]>();


	const token = cookies.load("token");

	useEffect(() => {
		console.log(user);
		if (user && !groups)
			fetchGroups();
	}, [groups, user]);

	const fetchGroups = async (): Promise<void> => {
		try {
			const { data } = await axios.get<{ groups: Group[] }>(`${OAUTH_API_URL}/api/group`, {
				headers: { Authorization: (user as User).access_token },
			});

			console.log(data);

			setGroups(data.groups);
			setValues({
				group: data.groups[0] ? data.groups[0]._id : ""
			});

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
	};

	const handleSaveGroupChanges = async ({ group }: SelectGroupForm, actions: FormikHelpers<SelectGroupForm>) => {
		try {
			await axios.post(`${API_URL}/user/saveGroup`, {
				group
			}, { headers: { Authorization: token }})
		} catch(e) {
			console.error(e.response);
		}

		actions.setSubmitting(false);
	};

	const { handleChange, handleSubmit, values, errors, touched, setValues } = useFormik<SelectGroupForm>({
		initialValues: {
			group: groups ? groups[0]._id : "none"
		},
		onSubmit: handleSaveGroupChanges
	});

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
								<form onSubmit={handleSubmit}>
									<M bottom="2em">
										<Text fontSize="1em">
											<Select value={values.group} onChange={handleChange} name="group">
												{
													groups
														? groups.map((group, i) => (
															<option key={group._id} value={group._id} label={group.name} />
														))
														: <option label="Loading..." />
												}
											</Select>
										</Text>
									</M>
									<SaveGroupButton type="submit">Save</SaveGroupButton>
								</form>
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
		</Layout >
	)
};


Settings.getInitialProps = async (ctx: NextPageContext) => {
	const { token } = nextCookies(ctx);

	if (!token) {
		redirect("/login", ctx);
		return {};
	}

	let user = await getUserFromToken(token);
	if (user) {
		if (!isValidUser(user))
			redirect("/complete_registration", ctx);
	} else
		redirect("/login", ctx);

	return {
	}
};

export default Settings;
