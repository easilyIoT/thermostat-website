import styled from 'styled-components';
import { orange } from "colors.css/js/colors"

import { ColorProp } from "../interfaces/components"

export default styled.form`
        display: block;
        text-align: center;
`;




export const FormInput = styled.input<ColorProp>`
        display: block;
        
        background-color: white;
        
        width: 100%;
        height: 50px;
        
        padding: 0 1em 0 4em;

        border-radius: 30px;

        box-shadow: 0 0 19px 6px rgba(${props => props.rgb && `${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b}` || "0,0,0"}, 0.17), 2px 17px 12px 0px rgba(${props => props.rgb && `${props.rgb.r}, ${props.rgb.g}, ${props.rgb.b}` || "0,0,0"}, 0.17);

        &:hover {
        }
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