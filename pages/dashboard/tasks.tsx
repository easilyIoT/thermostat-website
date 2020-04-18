import React, { useState, useEffect } from "react"
import { NextPage, NextPageContext } from 'next';
import nextCookies from 'next-cookies';
import cookies from "react-cookies";
import axios from "axios"
import styled, { css } from 'styled-components';

import { API_URL } from "../../config"

import { redirect, getUserFromToken, isValidUser } from "../../utils"
import { hexToRgb } from "../../utils/styles";

import useUser from "../../hooks/useUser";
import { useCreateTaskMutation, useTasksLazyQuery, Task, Time } from "../../graphql/types"


import Layout from '../../components/Layout'
import FullPage from "../../components/FullPage";
import Bg from "../../components/Bg";
import Picker from "../../components/Picker"
import Text from "../../components/Text"
import P from "../../components/P"
import CheckBox from "../../components/Checkbox";

type Props = {
}

type WPTask = {
	name: string,
	daily: boolean
	start?: Time,
	done?: Time,
};

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

const Button = styled.button <{ activated?: boolean, deactivated?: boolean }>`
	
	margin: 1em;
	padding: 1em 1.5em 1em 1.5em;

	color: ${props => !props.activated && "#2786f7" || "white"};
	background-color: ${props => !props.activated && "#e8f2ff" || "#2786f7"};

	border-radius: 10px;
	

	border: none;
	outline: none;

	${props => props.deactivated && "transition: transform ease-in 100ms;"}
	
	&:active{
		background-color: #2786f7;
		color: white;

		transform: scale(0.9);
	}

	@media screen and (max-width: 400px) {
		
		/*padding: 0.5em 1em 0.5em 1em;*/
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

const Form = styled.form`
	display: block;

	padding: 3em;

	width: 100%;
	height: 100%;

	@media screen and (max-width: 500px) {
		padding: 2em;
	}
`;

const InputSpan = styled.div`
	margin-bottom: 0.6em;
	
	width: 100%;
`;

const Input = styled.input`
	
	border-radius: 10px;
	padding: 1em;

	margin-bottom: 3em;

	border: 1px solid #d3d2d2;

	filter: brightness();
`;


const Tasks: NextPage<Props> = ({ }) => {
	const [user, reFetchUser] = useUser();
	const [getTasks, getTasksData] = useTasksLazyQuery();
	const [createTask, createTaskData] = useCreateTaskMutation();

	const [mode, setMode] = useState<"editing" | "creating" | null>();
	const [tasks, setTasks] = useState<Task[]>();
	const [actualTask, setActualTask] = useState<WPTask>({
		name: "",
		daily: false
	});

	const hours = Array(48).fill("").map((_, i) => `${(i / 2) < 10
		? `0${(i / 2) | 0}`
		: (i / 2) | 0}:${i % 2 ? "30" : "00"}`
	);


	useEffect(() => {
		if (!tasks)
			fetchTasks();

	}, [tasks]);

	useEffect(() => {
		if (getTasksData.data && getTasksData.data.tasks)
			setTasks(getTasksData.data.tasks.map<Task>(task => ({
				id: task.id,
				name: task.name,
				start: task.start,
				done: task.done,
				owner: task.owner,
				daily: task.daily
			})));
	}, [getTasksData.data])

	useEffect(() => {
		console.log(createTaskData.error);
	}, [createTaskData.error]);

	useEffect(() => console.log(actualTask), [actualTask]);

	const fetchTasks = async () => {
		console.log("Fetching")
		const token = cookies.load("token");

		try {
			getTasks({
				context: {
					headers: {
						authorization: token
					}
				}
			});

		} catch (e) {
			console.error(e.response, e);
		}
	};

	const handleSelectTask = (taskName: string) => {
		if (!tasks) return;

		if (mode !== "editing") {
			const task = tasks.find(task => task.name === taskName);
			if (!task) return;

			setMode("editing");
			setActualTask({
				...task
			});

		} else {
			setMode(null);
		}

	}

	const setCreateMode = () => {
		setActualTask({
			name: "",
			daily: false
		});

		setMode(mode === "creating" ? null : "creating");
	};

	const handleChangeNameOfTheTask = (e: any) => {
		const newValue = e.target.value;

		setActualTask(state => ({
			...state,
			name: newValue
		}));

	};

	const handleChangeDailySchedulation = (checked: boolean) => {
		setActualTask(state => ({
			...state,
			daily: checked
		}));
	};

	const handleSelectStartHour = (hour: string) => {
		setActualTask(state => ({
			...state,
			start: {
				hour: parseInt(hour.split(":")[0]),
				minute: parseInt(hour.split(":")[1])
			}
		}))
	}

	const handleSelectDoneHour = (hour: string) => {
		setActualTask(state => ({
			...state,
			done: {
				hour: parseInt(hour.split(":")[0]),
				minute: parseInt(hour.split(":")[1])
			}
		}));
	}

	const handleSave = async () => {
		if (!mode)
			return;

		const token = cookies.load("token");


		if (!actualTask.start || !actualTask.done)
			return;

		if (mode === "creating")
			createTask({
				context: {
					headers: {
						authorization: token
					}
				},
				variables: {
					name: actualTask.name,
					start: actualTask.start,
					done: actualTask.done,
					daily: actualTask.daily
				}
			})
		// Edit 

	}


	return (
		<Layout title="Tasks">
			<FullPage>
				<Bg>
					<Grid>
						<TaskList>
							<Text center fontSize="1em" ><P all="0.5em">Task List</P></Text>
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
								{
									mode === "creating"
										? <Form>

											<InputSpan>Name</InputSpan>
											<Input onChange={handleChangeNameOfTheTask} placeholder="Name of the task" />
											<br />
											<CheckBox onChange={handleChangeDailySchedulation} value={actualTask.daily} >daily</CheckBox>

										</Form>
										: mode === "editing"
											? <Form>

												<InputSpan>Name</InputSpan>
												<Input onChange={handleChangeNameOfTheTask} defaultValue={actualTask.name} placeholder="Name of the task" />
												<br />
												<CheckBox onChange={handleChangeDailySchedulation} value={actualTask.daily} >daily</CheckBox>

											</Form>
											: <div>Null</div>
								}
							</Info>

							<Picker {...mode === "editing" ? { initialValue: actualTask && actualTask.start && `${actualTask.start.hour < 10 ? `0${actualTask.start.hour}` : actualTask.start.hour}:${actualTask.start.minute < 10 ? `0${actualTask.start.minute}` : actualTask.start.minute}` || ""} : {initialValue: ""}} breakAt={900} values={hours} css={`grid-area: start;`} handleClick={handleSelectStartHour} />
							<Picker {...mode === "editing" ? { initialValue: actualTask && actualTask.done && `${actualTask.done.hour < 10 ? `0${actualTask.done.hour}` : actualTask.done.hour}:${actualTask.done.minute < 10 ? `0${actualTask.done.minute}` : actualTask.done.minute}` || ""} : {initialValue: ""}} breakAt={900} values={hours} css={`grid-area: done;`} handleClick={handleSelectDoneHour} />
						</TaskInfo>
						<BottomBar>
							<Button css={`float: left;`} activated={mode === "creating"} deactivated={mode === "editing"} onClick={setCreateMode}>Create</Button>
							<Button css={`float: right;`} onClick={handleSave} >Save</Button>
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
