import React, { useState, FunctionComponent, useEffect } from "react"
import { NextPage, NextPageContext } from 'next';
import nextCookies from 'next-cookies';
import cookies from "react-cookies"
import axios from "axios"

import { redirect, getUserFromToken, isValidUser } from "../../utils"

import Layout from '../../components/Layout'
import Thermostat from "../../components/Thermostat"

import useUser from "../../hooks/useUser"

import { OAUTH_API_URL, API_URL } from "../../config"

import { Group } from "../../interfaces/api"

type Props = {

}

function getStateFromTemperatureController(group: Group): number {
	return parseInt(group.devices.find(device => device.type === "ThermostatController")?.state || "19");
}

const Regulate: NextPage<Props> = () => {
	const [user, refetchUser, validation, regen] = useUser();
	const [group, setGroup] = useState<Group>();
	const [temperature, setTemperature] = useState<number>(19);

	useEffect(() => {
		fetchGroup();
	}, [user]);


	const fetchGroup = async () => {
		if (!user) return;

		const token = cookies.load("token");

		try {
			const { data } = await axios.get(`${OAUTH_API_URL}/api/group/${user.group}`, {
				headers: {
					Authorization: user.access_token
				}
			});
			
			setGroup(data.group);
			
			setTemperature(getStateFromTemperatureController(data.group));
		} catch (e) {
			console.log(e.response || e);
		}
	};


	const handleNewThemperature = async (value: number) => {
		if (!user || !group) return;

		const token = cookies.load("token");

		const device = group.devices.find(device => device.type === "ThermostatController");

		try {
			await axios.post(`${OAUTH_API_URL}/api/device/${device?._id}/setTemperature`, {
				temperature: value
			}, {
				headers: {
					Authorization: user.access_token
				}
			});
			
			setTemperature(value);
			
			
		} catch (e) {
			if (e.response && e.response.status === 401) 
				regen();
			else
				console.error(e)
			
		}
	}
	return (
		<Layout title="Regulate">
			<Thermostat value={temperature} handleChange={handleNewThemperature} />
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