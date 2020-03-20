import React, { useState, useEffect } from "react"
import { NextPage, NextPageContext } from 'next';
import nextCookies from 'next-cookies';
import cookies from "react-cookies";
import axios from "axios"
import styled, { css } from 'styled-components';

import { API_URL } from "../../config"

import { redirect, getUserFromToken, isValidUser } from "../../utils"
import { hexToRgb } from "../../utils/colors";

import useUser from "../../hooks/useUser";

import { User, Task } from "../../interfaces/api"

import Layout from '../../components/Layout'
import FullPage from "../../components/FullPage";
import Bg from "../../components/Bg";
import Picker from "../../components/Picker"
import Text from "../../components/Text"
import P from "../../components/P"

type Props = {
}

const Grid = styled.div`
	display: grid;
		
	min-height: 0;
	height: 100%;
	width: 100%;

	grid-template-columns: 1fr 3fr;
	grid-template-rows: 1fr auto;

	align-items: center;
	justify-items: center;

	
`;

const TaskInfo = styled.div`
	display: grid;

	min-height: 0;
	width: 100%;
	height: 100%;

	

	grid-template-areas: 
		'info-span start-span done-span'
		'info start done';


	grid-template-columns: 2fr 0.7fr 0.7fr;
	grid-template-rows: 4em 1fr;

	align-items: center;
	justify-items: center;

	@media screen and (max-width: 900px) {
		grid-template-areas: 
			"info-span"
			"info"
			"start-span"
			"start"
			"done-span"
			"done";

		grid-template-columns: 1fr;
		grid-template-rows: 4em 3fr 2.5em auto 2.5em auto;

	}

`;

const TaskList = styled.div`
	display: grid;
	
	width: 100%;
	height: 100%;

	border-right: 1px solid #ebeded; 

	grid-template-rows: auto 1fr;
	
	align-items: center;
	justify-items: center;
`;

const Info = styled.div`
	display: block;

	width: 100%;
	height: 100%;

	border-right: 1px solid #ebeded;
`;

const BottomBar = styled.div`
	display: block;

	border-top: 1px solid #ebeded;
	width: 100%;
	height: 100%;

	grid-column: span 2 / auto;

	&:nth-child(0) {
		float: left;
	}

	&:nth-child(1) {
		float: right;
	}
`;

const Button = styled.button`
	
	margin: 1em;
	padding: 1em 1.5em 1em 1.5em;

	color: #2786f7;
	background-color: #e8f2ff;

	border-radius: 10px;
	

	border: none;
	outline: none;

	transition: transform ease-in 100ms;
	&:active{
		background-color: #2786f7;
		color: white;

		transform: scale(0.9);
	}

`;

const SectionTitle = styled.div`
	display: flex;

	align-items: center;
	justify-content: center;
	
	border-bottom: 1px solid #ebeded;
	
	height: 100%;
	width: 100%;
`;

const Tasks: NextPage<Props> = ({ }) => {
	const [user, reFetchUser] = useUser();
	const [tasks, setTasks] = useState<Task[]>();
	const token = cookies.load("token");

	const hours = Array(48).fill("").map((_, i) => `${(i / 2) < 10
		? `0${(i / 2) | 0}`:(i / 2) | 0}:${i % 2 ? "30":"00"}`
	);


	useEffect(() => {
		if (!tasks)
			fetchTasks();

	}, [tasks]);


	const fetchTasks = async () => {
		try {
			const { data } = await axios.get<{ tasks: Task[] }>(`${API_URL}/task`, {
				headers: { Authorization: token }
			});

			console.log(data);
			setTasks(data.tasks);
		} catch (e) {
			console.error(e.response);
		}
	};

	const handleSelectTask = (taskName: string) => {
		console.log(taskName);
	}


	return (
		<Layout title="Tasks">
			<FullPage>
				<Bg>
					<Grid>
						<TaskList>
							<Text center fontSize="2em" ><P all="0.5em">Task List</P></Text>
							<Picker values={tasks ? tasks.map(task => task.name) : []} handleClick={handleSelectTask} />
						</TaskList>
						<TaskInfo>
							<SectionTitle css={`
								grid-area: info-span;
							`}>Info</SectionTitle>

							<SectionTitle css={`
								grid-area: start-span;
							`}>Start</SectionTitle>

							<SectionTitle css={`
								grid-area: done-span;
							`}>End</SectionTitle>

							<Info css={`grid-area: info;`}>

							</Info>

							<Picker breakAt={900} values={hours} css={`grid-area: start;`} handleClick={h => { }} />
							<Picker breakAt={900} values={hours} css={`grid-area: done;`} handleClick={h => { }} />
						</TaskInfo>
						<BottomBar>
							<Button css={`float: left;`}>Create</Button>
							<Button css={`float: right;`}>Save</Button>
						</BottomBar>
					</Grid>
				</Bg>
			</FullPage>
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
