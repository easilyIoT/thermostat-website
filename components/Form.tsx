import styled from 'styled-components';
import { orange } from "colors.css/js/colors"

import { ColorProp } from "../interfaces/components"

export default styled.form`
        display: block;
        text-align: center;
`;


export const FormInputGroup = styled.div<ColorProp>`
        display: flex;
        flex-direction: row;
        align-items: center;

        background-color: white;

        width: 100%;
        height: 50px;
        border-radius: 30px;

        box-shadow: 0 0 19px 6px rgba(${props => props.rgb && `${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b}` || "0,0,0"}, 0.17), 2px 17px 12px 0px rgba(${props => props.rgb && `${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b}` || "0,0,0"}, 0.17);

        padding: 0.2em 0.8em 0.2em 1em;
        margin-bottom: 2em;

        & svg {
                ${props => props.rgb && `color: rgb(${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b});`}
                margin-right: 0.7em;
                margin-left: 0.3em;
        }

        @media screen and (max-width: 400px) {
                & svg {
                        display: none;
                }
        }
`;

export const FormInput = styled.input<ColorProp>`
        display: block;
        
        background-color: white;
        
        width: 100%;
        height: 100%;

        
`;


export const FormButton = styled.button`
        display: block;
        
        height: 60px;
        width: 100%;

        background-image: linear-gradient(150deg,#f9d423 0%,#ff4e50 100%);
        color: white;

        border-radius: 30px;
        padding: 1em;
        margin: auto;
        margin-top: 2em;

        font-size: 1.3em;
        font-weight: 700;

        cursor: pointer;

        box-shadow: 4px 5px 10px -4px ${orange};

        transition: box-shadow 0.25s ease, transform 0.25s ease;

        &:hover {
                background: darken(${orange}, 5%);
        }
`;