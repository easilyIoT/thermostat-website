import styled from "styled-components"
import { FunctionComponent, useState } from 'react';


type Props = {
	onChange: (checked: boolean) => void,
	value: boolean
};

const InputCheckBox = styled.div<{ checked: boolean }>`
	width: 100%;	

	& > input[type=checkbox] {
		visibility: hidden;
		display: block;
	}

	& > label {
	
		position: relative;
		padding-left: 1.5rem;

		&::before {
			position: absolute;
			left: 0.1rem;
			top: 0.15rem;

			display: ${props => props.checked && "inline-block" || "none"};


			font-style: normal;
			font-variant: normal;
			text-rendering: auto;
			-webkit-font-smoothing: antialiased;
			
			font-family: "Font Awesome 5 Free";
			font-weight: 900;

			content: '\f00c';
			
			width: 1rem;
			height: 1rem;

			font-size: 0.9rem;

			color: #2786f7;
		}

		&::after {
			position: absolute;
			left: 0;


			border: 1px solid #d3d2d2;
			
			width: 1rem;
			height: 1rem;

			border-radius: 5px;
			
			content: '';

		}
	}
`;

const CheckBox: FunctionComponent<Props> = ({ children, onChange, value }) => {
        const [uuid] = useState<number>(Math.random());
        const [checked, setChecked] = useState<boolean>(value);

        const handleChange = (e: any) => {
		const actualCheckedState = checked;

                setChecked(!actualCheckedState);
                onChange(!actualCheckedState);
        }

        return (
                <InputCheckBox checked={checked}>
                        <input type="checkbox" id={`${uuid}-check`} checked={checked} onClick={handleChange} />

                        <label htmlFor={`${uuid}-check`}>
                                {children}
                        </label>
                </InputCheckBox>
        );
};


export default CheckBox;