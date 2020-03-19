import React, { useState, useEffect } from "react"
import { NextPage, NextPageContext } from 'next';
import nextCookies from 'next-cookies';
import cookies from "react-cookies";
import axios from "axios"

import { API_URL } from "../../config"
import { redirect, getUserFromToken, isValidUser } from "../../utils"

import { User, Task } from "../../interfaces/api"

import Layout from '../../components/Layout'

import useUser from "../../hooks/useUser";


type Props = {
}

const Tasks: NextPage<Props> = ({ }) => {
	const [user, reFetchUser] = useUser();
	const [tasks, setTasks] = useState<Task[]>();
	const token = cookies.load("token");

	useEffect(() => {
		if(!tasks)
			fetchTasks();

	}, [tasks]);

	
	const fetchTasks = async () => {
		try {
			const { data } = await axios.get<{ tasks: Task[] }>(`${API_URL}/task`, {
				headers: { Authorization: token }
			});

			setTasks(data.tasks);
		} catch(e) {
			console.error(e.response);
		}
	};



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
