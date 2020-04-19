import React, { useState, FunctionComponent, useEffect } from "react"
import styled, { css } from "styled-components"
import { orange, white } from "colors.css/js/colors"

type Props = {
	handleClick: (hour: string) => void | Promise<void>,
	values: string[],
	initialValue?: string
};

type Breakable = {
	breakAt?: number;
}

const Scrollable = styled.div<Breakable>`

	display: flex;
	
	flex-direction: column;
	

	overflow-y: auto;
	
	width: 100%;
	height: 100%;

	align-items: flex-start;
	

	&::-webkit-scrollbar {
		width: 5px;

	}

	&::-webkit-scrollbar-track {
                background: transparent;
        }

	&::-webkit-scrollbar-thumb {
                background: #b5b6b8;
		border-radius: 10px;
        }


	${props => props.breakAt && `
	@media screen and (max-width: ${props.breakAt}px) {
		flex-direction: row;
	}
	`}

`;

const Pickable = styled.div<{ picked?: boolean }>`
	display: block;
	
	font-weight: 600;

	padding: 1em;
	margin: 1em;
	
	${props => !props.picked && `border: 1px solid #e1e4e8;`} 
	
	text-align: center;

	
	background-color: ${props => props.picked && "#2786f7" || white};
        color: ${props => props.picked && white || "#2786f7"};
        
	border-radius: 10px;
	
	cursor: pointer;
	
	transition: transform ease-in 100ms;

	
	&:active {
		transform: scale(0.9);
	}
`
const CenterInTheScreen = styled.div`
	display: flex;

	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;

	font-weight: 300;


`;



const Picker: FunctionComponent<Props & Breakable> = ({ handleClick, values, breakAt, initialValue }) => {
	const [selectedValue, setSelectedValue] = useState<string>(initialValue || "");

	useEffect(() => {
		if(initialValue || initialValue === "")
			setSelectedValue(initialValue);
	}, [initialValue])

	const handlePick = (hour: string) => () => {

		setSelectedValue(selectedValue !== hour ? hour : "");

		handleClick(hour);
	};



	return (
		<Scrollable breakAt={breakAt}>
			{values.length
				? values.map((value, i) =>
					<div
						css={`
							width: 100%;
						`}
						key={i}
					>
						<Pickable
							onClick={handlePick(value)}
							picked={selectedValue === value}
						>
							{value}
						</Pickable>
					</div>
				)
				: <CenterInTheScreen>empty</CenterInTheScreen>
			}
		</Scrollable>
	)
};

export default Picker;

